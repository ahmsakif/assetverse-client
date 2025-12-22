import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../Hooks/useAuth';
import useAxios from '../../Hooks/useAxios';
import Pagination from '../../Utilities/Pagination';
               

const MyRequest = () => {
    const { user } = useAuth();
    const axiosInstance = useAxios();

    // States
    const [search, setSearch] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    // Debounce Search Logic
    useEffect(() => {
        const handler = setTimeout(() => {
            setSearchQuery(search);
            setCurrentPage(0);
        }, 500);
        return () => clearTimeout(handler);
    }, [search]);

    // Fetch Requests
    const { 
        data: requestsData = { result: [], count: 0 }, 
        isLoading 
    } = useQuery({
        queryKey: ['my-requests', user?.email, searchQuery, currentPage, itemsPerPage],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosInstance.get('/requests', {
                params: {
                    email: user.email,
                    search: searchQuery,
                    page: currentPage,
                    limit: itemsPerPage
                }
            });
            return res.data;
        }
    });

    const myRequests = requestsData.result;
    const totalCount = requestsData.count;
    console.log(myRequests);

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-6 text-primary">My Requests History</h2>

            {/* Search Bar */}
            <div className="mb-6">
                <input 
                    type="text" 
                    placeholder="Search by asset name..." 
                    className="input input-bordered w-full max-w-xs"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* Requests Table */}
            <div className="overflow-x-auto bg-base-100 shadow-md rounded-lg border border-base-200">
                <table className="table">
                    {/* Table Head */}
                    <thead className="bg-base-200">
                        <tr>
                            <th>Asset Name & Type</th>
                            <th>Request Date</th>
                            <th>Approve / Reject Date</th>
                            <th>Processed By</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    
                    {/* Table Body */}
                    <tbody>
                        {isLoading ? (
                            <tr><td colSpan="5" className="text-center py-10">Asset Loading</td></tr>
                        ) : myRequests.length === 0 ? (
                            <tr><td colSpan="5" className="text-center py-10 opacity-50">No requests found.</td></tr>
                        ) : (
                            myRequests.map((request) => (
                                <tr key={request._id} className="hover">
                                    {/* Column 1: Asset Info */}
                                    <td>
                                        <div className="font-bold">{request.assetName}</div>
                                        <div className="badge badge-ghost badge-sm mt-1">{request.assetType}</div>
                                        <div className="text-xs text-gray-400 mt-1">{request.companyName}</div>
                                    </td>

                                    {/* Column 2: Request Date */}
                                    <td>
                                        {new Date(request.requestDate).toLocaleDateString()}
                                    </td>

                                    {/* Column 3: Approval Date (Only if approved/rejected) */}
                                    <td className=''>
                                        {request.approvedDate ? (
                                            <span className="text-success font-semibold">
                                                {new Date(request.approvedDate).toLocaleDateString()}
                                            </span>
                                        ) : request.rejectedDate ? (
                                            <span className="text-error font-semibold">
                                                {new Date(request.rejectedDate).toLocaleDateString()}
                                            </span>
                                        ) : (
                                            <span className="text-gray-400 text-xs">--</span>
                                        )}
                                    </td>

                                    {/* Column 4: Processed By (HR Email) */}
                                    <td>
                                        {request.approvedDate || request.rejectedDate ? (
                                            <div className="text-sm opacity-80">{request.hrEmail}</div>
                                        ) : (
                                             <span className="text-xs italic text-red-500">Pending Action</span>
                                        )}
                                    </td>

                                    {/* Column 5: Status Badge */}
                                    <td>
                                        {request.requestStatus === 'pending' && <div className="badge badge-warning text-white">Pending</div>}
                                        {request.requestStatus === 'approved' && <div className="badge badge-success text-white">Approved</div>}
                                        {request.requestStatus === 'rejected' && <div className="badge badge-error text-white">Rejected</div>}
                                        {request.requestStatus === 'returned' && <div className="badge badge-neutral text-white">Returned</div>}
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

export default MyRequest;