import React, { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import useAuth from '../../Hooks/useAuth';
import useAxios from '../../Hooks/useAxios';
import Pagination from '../../Utilities/Pagination';
import RequestReviewModal from '../../Components/RequestAssetComponents/RequestReviewModal';
import Swal from 'sweetalert2';


const AllRequests = () => {
    const { user } = useAuth();
    const axiosInstance = useAxios();

    // Filter & Pagination States
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);
    const [search, setSearch] = useState('');
    const [selectedRequest, setSelectedRequest] = useState(null);

    // Fetch Requests for HR
    const {
        data: requestsData = { result: [], count: 0 },
        isLoading,
        refetch
    } = useQuery({
        queryKey: ['all-requests', user?.email, search, currentPage, itemsPerPage],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosInstance.get('/requests', {
                params: {
                    hrEmail: user.email,
                    search: search,
                    page: currentPage,
                    limit: itemsPerPage
                }
            });
            return res.data;
        }
    });

    const requests = requestsData.result;
    const totalCount = requestsData.count;
    console.log(requests);

    //  Handle Approve
    const handleApprove = async (request) => {
        try {
            const res = await axiosInstance.patch(`/requests/${request._id}`, { status: 'approved' });

            // --- CRITICAL: Check for Package Limit Error from Backend ---
            if (res.data.error) {
                Swal.fire({
                    title: 'Package Limit Reached',
                    text: 'You have reached the maximum number of employees for your package. Please upgrade to approve this request.',
                    icon: 'warning',
                    confirmButtonText: 'Understood'
                });
                return;
            }

            // --- Success Case ---
            if (res.data.modifiedCount > 0) {
                Swal.fire('Approved', 'Request approved successfully.', 'success');
                refetch(); // Refresh the table
            }

        } catch (error) {
            console.error(error);
            Swal.fire('Error', 'Failed to approve request.', 'error');
        }
    };

    //  Handle Reject
    const handleReject = async (id) => {
        // Optional: Add a Swal confirm dialog here if you want extra safety

        try {
            const res = await axiosInstance.patch(`/requests/${id}`, { status: 'rejected' });
            if (res.data.modifiedCount > 0) {
                Swal.fire('Rejected', 'Request has been rejected.', 'success');
                refetch(); // Refresh the table
            }
        } catch (error) {
            console.error(error);
            Swal.fire('Error', 'Failed to reject request.', 'error');
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-6 text-primary">Asset Requests</h2>

            {/* Search Bar */}
            <div className="mb-6 input input-bordered w-full max-w-md">
                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="2.5"
                        fill="none"
                        stroke="currentColor"
                    >
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.3-4.3"></path>
                    </g>
                </svg>
                <input
                    type="search"
                    placeholder="Search by asset name, requester name or email..."
                    className=""
                    value={search}
                    onChange={(e) => {
                        e.preventDefault
                        setSearch(e.target.value);
                        setCurrentPage(0);
                    }}
                />
            </div>

            {/* Table */}
            <div className="overflow-x-auto bg-base-100 shadow-md rounded-lg border border-base-200">
                <table className="table">
                    {/* Head */}
                    <thead className="bg-base-200">
                        <tr>
                            <th>Asset Name</th>
                            <th>Type</th>
                            <th>Requester</th>
                            <th>Request Date</th>
                            <th>Note</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan="7" className="text-center py-10">
                                    <span className="loading loading-spinner loading-lg"></span>
                                </td>
                            </tr>
                        ) : requests.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="text-center py-10 text-gray-500">
                                    No requests found.
                                </td>
                            </tr>
                        ) : (
                            requests.map((req) => (
                                <tr key={req._id}>
                                    <td className="font-bold">{req.assetName}</td>
                                    <td>
                                        <div className="badge badge-ghost">{req.assetType}</div>
                                    </td>
                                    <td>
                                        <div className="flex flex-col">
                                            <span className="font-bold">{req.requesterName}</span>
                                            <span className="text-xs opacity-50">{req.requesterEmail}</span>
                                        </div>
                                    </td>
                                    <td>{new Date(req.requestDate).toLocaleDateString()}</td>
                                    <td className="max-w-xs truncate" title={req.note}>{req.note || "N/A"}</td>
                                    <td>
                                        <div className={`badge ${req.requestStatus === 'pending' ? 'badge-warning' : req.requestStatus === 'approved' ? 'badge-success' : 'badge-error'}`}>
                                            {req.requestStatus}
                                        </div>
                                    </td>
                                    <td className="">
                                        {req.requestStatus === 'pending' && (
                                            <button
                                                onClick={() => setSelectedRequest(req)} // Opens the modal
                                                className="btn btn-sm btn-primary btn-outline py-6"
                                            >
                                                Review Request
                                            </button>
                                        )}
                                        {req.requestStatus !== 'pending' && (
                                            <span className="text-gray-400 text-sm italic">Completed</span>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                itemsPerPage={itemsPerPage}
                setItemsPerPage={setItemsPerPage}
                totalCount={totalCount}
            />

            {
                selectedRequest && <RequestReviewModal
                    selectedRequest={selectedRequest}
                    setSelectedRequest={setSelectedRequest}
                    handleReject={handleReject}
                    handleApprove={handleApprove}
                />
            }

        </div>
    );
};

export default AllRequests;