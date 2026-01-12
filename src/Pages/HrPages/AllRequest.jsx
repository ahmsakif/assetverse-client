import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Pagination from '../../Utilities/Pagination';
import RequestReviewModal from '../../Components/RequestAssetComponents/RequestReviewModal';
import Swal from 'sweetalert2';
import { FaSearch, FaInbox, FaUserCircle, FaCalendarAlt, FaCheckCircle, FaTimesCircle, FaClock } from 'react-icons/fa';

const AllRequests = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    // States
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);
    const [search, setSearch] = useState('');
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [sortOrder, setSortOrder] = useState('');


    // 1. Fetch Requests
    const { data: requestsData = { result: [], count: 0 }, refetch, isLoading } = useQuery({
        queryKey: ['all-requests', user?.email, search, currentPage, itemsPerPage, sortOrder],
        queryFn: async () => {
            const res = await axiosSecure.get('/requests', {
                params: {
                    hrEmail: user.email,
                    search: search,
                    page: currentPage,
                    limit: itemsPerPage,
                    sort: sortOrder // Pass the sort state
                }
            });
            return res.data;
        }
    });
    // Fetch User
    const { data: dbUser = {} } = useQuery({
        queryKey: ['profile', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`);
            return res.data;
        }
    });

    const requests = requestsData.result;
    const totalCount = requestsData.count;

    // 2. Action Handlers
    const handleApprove = async (request) => {
        try {
            const res = await axiosSecure.patch(`/requests/${request._id}`, { status: 'approved' });

            if (res.data.error) {
                Swal.fire({
                    title: 'Limit Reached',
                    text: 'Upgrade your package to add more employees/assets.',
                    icon: 'warning',
                    confirmButtonColor: '#f59e0b'
                });
                return;
            }

            if (res.data.modifiedCount > 0) {
                Swal.fire({
                    title: 'Approved!',
                    text: 'Asset request has been authorized.',
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false
                });
                refetch();
                setSelectedRequest(null);
            }
        } catch (error) {
            Swal.fire('Error', 'Action failed. Please try again.', 'error');
        }
    };

    const handleReject = async (id) => {
        try {
            const res = await axiosSecure.patch(`/requests/${id}`, { status: 'rejected' });
            if (res.data.modifiedCount > 0) {
                Swal.fire('Rejected', 'Request has been denied.', 'success');
                refetch();
                setSelectedRequest(null);
            }
        } catch (error) {
            Swal.fire('Error', 'Action failed.', 'error');
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <title>All Requests | AssetVerse</title>

            {/* --- HEADER --- */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                <div className="space-y-1">
                    <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Request Inbox</h2>
                    <p className="text-slate-500 font-medium">Review pending asset requests from your team.</p>
                </div>
                <div className="bg-amber-50 px-6 py-3 rounded-2xl border border-amber-100 hidden lg:block">
                    <div className="flex items-center gap-3">
                        <FaInbox className="text-amber-600" />
                        <span className="text-sm font-bold text-amber-900">{totalCount} Total Items</span>
                    </div>
                </div>
            </div>

<div className='flex justify-between items-center'>
                {/* --- SEARCH BAR --- */}
            <div className="relative w-full max-w-md group">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" />
                <input
                    type="search"
                    placeholder="Search requester, email, or asset..."
                    className="input input-bordered w-full pl-12 rounded-2xl bg-white border-slate-200 focus:ring-4 focus:ring-primary/10 transition-all h-12"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setCurrentPage(0);
                    }}
                />
            </div>
            {/* Sort Option */}
            <div>
                <select
                    className="select select-bordered pr-12 border-slate-200 focus:ring-4 focus:ring-primary/10 transition-all rounded-2xl w-full md:w-auto"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                >
                    <option className='hover:bg-slate-200' value="">Default (Pending First)</option>
                    <option className='hover:bg-slate-200' value="date_desc">Newest First</option>
                    <option className='hover:bg-slate-200' value="date_asc">Oldest First</option>
                </select>
            </div>
</div>

            {/* --- TABLE SECTION --- */}
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr className="bg-slate-50/80 text-slate-400 uppercase text-[11px] font-black tracking-widest border-b border-slate-100 h-16">
                                <th className="pl-8">Asset Details</th>
                                <th>Requester Profile</th>
                                <th>Requested On</th>
                                <th className="max-w-xs">Additional Note</th>
                                <th className="text-center">Status</th>
                                <th className="text-right pr-8">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {isLoading ? (
                                <tr>
                                    <td colSpan="6" className="py-20 text-center">
                                        <span className="loading loading-spinner loading-lg text-primary"></span>
                                    </td>
                                </tr>
                            ) : requests.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="py-24 text-center">
                                        <div className="flex flex-col items-center opacity-40">
                                            <FaInbox size={48} className="mb-4 text-slate-300" />
                                            <p className="text-lg font-bold text-slate-600">All caught up!</p>
                                            <p className="text-sm text-slate-400">No pending requests found.</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                requests.map((req) => (
                                    <tr key={req._id} className="hover:bg-slate-50/50 transition-colors group">

                                        {/* Asset Info */}
                                        <td className="pl-8 py-5">
                                            <div className="font-black text-slate-700 text-base">{req.assetName}</div>
                                            <div className="badge badge-ghost badge-sm font-bold text-[10px] uppercase tracking-wider mt-1 text-slate-400">
                                                {req.assetType}
                                            </div>
                                        </td>

                                        {/* Requester Info */}
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar placeholder">
                                                    <div className="bg-slate-100 text-slate-400 rounded-full w-10">
                                                        <img src={dbUser.userPhoto} alt="" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold text-slate-700">{req.requesterName}</div>
                                                    <div className="text-[11px] font-bold text-slate-400">{req.requesterEmail}</div>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Date */}
                                        <td className="text-slate-500 font-semibold text-sm">
                                            <div className="flex items-center gap-2">
                                                <FaCalendarAlt className="text-slate-300" />
                                                {new Date(req.requestDate).toLocaleDateString()}
                                            </div>
                                        </td>

                                        {/* Note */}
                                        <td className="max-w-[200px]">
                                            {req.note ? (
                                                <div className="text-xs text-slate-600 bg-slate-50 p-2 rounded-lg truncate border border-slate-100" title={req.note}>
                                                    "{req.note}"
                                                </div>
                                            ) : (
                                                <span className="text-[10px] text-slate-300 font-bold uppercase tracking-widest pl-2">No Note</span>
                                            )}
                                        </td>

                                        {/* Status Badge */}
                                        <td className="text-center">
                                            {req.requestStatus === 'pending' && (
                                                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 text-amber-600 border border-amber-100 shadow-sm">
                                                    <span className="relative flex h-2 w-2">
                                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                                                    </span>
                                                    <span className="text-[10px] font-black uppercase tracking-widest">Pending</span>
                                                </div>
                                            )}
                                            {req.requestStatus === 'approved' && (
                                                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
                                                    <FaCheckCircle size={12} />
                                                    <span className="text-[10px] font-black uppercase tracking-widest">Approved</span>
                                                </div>
                                            )}
                                            {req.requestStatus === 'rejected' && (
                                                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-50 text-rose-600 border border-rose-100">
                                                    <FaTimesCircle size={12} />
                                                    <span className="text-[10px] font-black uppercase tracking-widest">Rejected</span>
                                                </div>
                                            )}
                                            {req.requestStatus === 'returned' && (
                                                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-slate-500 border border-slate-200">
                                                    <FaClock size={12} />
                                                    <span className="text-[10px] font-black uppercase tracking-widest">Returned</span>
                                                </div>
                                            )}
                                        </td>

                                        {/* Actions */}
                                        <td className="text-right pr-8">
                                            {req.requestStatus === 'pending' ? (
                                                <button
                                                    onClick={() => setSelectedRequest(req)}
                                                    className="btn btn-sm btn-primary rounded-xl px-6 shadow-lg shadow-primary/20 font-bold tracking-wide hover:-translate-y-0.5 transition-transform"
                                                >
                                                    Review
                                                </button>
                                            ) : (
                                                <span className="text-xs font-bold text-slate-300 italic pr-4">
                                                    Completed
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* --- PAGINATION --- */}
            <div className="bg-white p-4 rounded-3xl border border-slate-100 flex justify-center shadow-sm">
                <Pagination
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    itemsPerPage={itemsPerPage}
                    setItemsPerPage={setItemsPerPage}
                    totalCount={totalCount}
                />
            </div>

            {/* MODAL INTEGRATION */}
            {selectedRequest && (
                <RequestReviewModal
                    selectedRequest={selectedRequest}
                    setSelectedRequest={setSelectedRequest}
                    handleReject={handleReject}
                    handleApprove={handleApprove}
                />
            )}
        </div>
    );
};

export default AllRequests;