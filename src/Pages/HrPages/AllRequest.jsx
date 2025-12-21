import React, { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import useAuth from '../../Hooks/useAuth';
import useAxios from '../../Hooks/useAxios';
import Pagination from '../../Utilities/Pagination';
import LoadingSpinner from '../../Utilities/LoadingSpinner';


const AllRequests = () => {
    const { user } = useAuth();
    const axiosInstance = useAxios();
    
    // Filter & Pagination States
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);
    const [search, setSearch] = useState('');

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

    const handleApprove = (id) => {
        console.log("Approve", id);
        // We will implement this next
    };

    const handleReject = (id) => {
        console.log("Reject", id);
        // We will implement this next
    };

    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-6">Asset Requests</h2>

            {/* Search Bar */}
            <div className="mb-6">
                <input 
                    type="text" 
                    placeholder="Search by requester name or email..." 
                    className="input input-bordered w-full max-w-md"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setCurrentPage(0); // Reset to page 0 on search
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
                        {requests.length === 0 ? (
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
                                    <td className="flex gap-2">
                                        {req.requestStatus === 'pending' && (
                                            <>
                                                <button 
                                                    onClick={() => handleApprove(req._id)}
                                                    className="btn btn-xs btn-success text-white"
                                                >
                                                    Approve
                                                </button>
                                                <button 
                                                    onClick={() => handleReject(req._id)}
                                                    className="btn btn-xs btn-error text-white"
                                                >
                                                    Reject
                                                </button>
                                            </>
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
        </div>
    );
};

export default AllRequests;