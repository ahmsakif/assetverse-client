import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../Hooks/useAuth';
import Pagination from '../../Utilities/Pagination';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { FaSearch, FaHistory, FaCalendarCheck, FaUserTie, FaClipboardList } from 'react-icons/fa';

const MyRequest = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

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
            const res = await axiosSecure.get('/requests', {
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

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <title>Request History | AssetVerse</title>

            {/* --- TOP HEADER --- */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <div className="space-y-1">
                    <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Request History</h2>
                    <p className="text-slate-500 font-medium">Review and track the status of your equipment requests.</p>
                </div>
                <div className="bg-indigo-50 px-6 py-3 rounded-2xl border border-indigo-100 hidden lg:block">
                    <div className="flex items-center gap-3">
                        <FaClipboardList className="text-indigo-600" />
                        <span className="text-sm font-bold text-indigo-900">{totalCount} Total Requests</span>
                    </div>
                </div>
            </div>

            {/* --- SEARCH BOX --- */}
            <div className="relative w-full max-w-md group">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" />
                <input 
                    type="text" 
                    placeholder="Search by asset name..." 
                    className="input input-bordered w-full pl-12 rounded-2xl bg-white border-slate-200 focus:ring-4 focus:ring-primary/10 transition-all"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* --- TABLE SECTION --- */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        {/* Table Head */}
                        <thead>
                            <tr className="bg-slate-50/50 text-slate-500 uppercase text-[11px] font-black tracking-widest border-b border-slate-100">
                                <th className="py-5 px-6">Asset & Company</th>
                                <th>Requested On</th>
                                <th>Outcome Date</th>
                                <th>Reviewer</th>
                                <th className="text-right px-6">Current Status</th>
                            </tr>
                        </thead>
                        
                        {/* Table Body */}
                        <tbody className="divide-y divide-slate-50">
                            {isLoading ? (
                                <tr>
                                    <td colSpan="5" className="py-20 text-center">
                                        <span className="loading loading-spinner loading-lg text-primary"></span>
                                    </td>
                                </tr>
                            ) : myRequests.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="py-20 text-center text-slate-400 font-medium italic">
                                        No request history found.
                                    </td>
                                </tr>
                            ) : (
                                myRequests.map((request) => (
                                    <tr key={request._id} className="hover:bg-slate-50/50 transition-colors group">
                                        {/* Column 1: Asset Info */}
                                        <td className="px-6 py-5">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-slate-700 text-base">{request.assetName}</span>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className="text-[10px] font-black uppercase px-2 py-0.5 bg-slate-100 text-slate-500 rounded-md tracking-tighter">
                                                        {request.assetType}
                                                    </span>
                                                    <span className="text-xs text-slate-400 font-medium truncate max-w-[150px]">
                                                        @{request.companyName}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Column 2: Request Date */}
                                        <td className="text-slate-600 font-semibold">
                                            <div className="flex items-center gap-2">
                                                <FaHistory size={12} className="text-slate-300" />
                                                {new Date(request.requestDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </div>
                                        </td>

                                        {/* Column 3: Decision Date */}
                                        <td>
                                            {request.approvedDate || request.rejectedDate ? (
                                                <div className="flex items-center gap-2">
                                                    <FaCalendarCheck size={12} className={request.approvedDate ? "text-emerald-400" : "text-rose-400"} />
                                                    <span className="text-slate-600 font-semibold">
                                                        {new Date(request.approvedDate || request.rejectedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                    </span>
                                                </div>
                                            ) : (
                                                <span className="text-slate-300 text-xs tracking-widest font-black">—</span>
                                            )}
                                        </td>

                                        {/* Column 4: Processed By */}
                                        <td>
                                            {request.approvedDate || request.rejectedDate ? (
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-bold text-slate-600 truncate max-w-[140px]">{request.hrEmail}</span>
                                                    <span className="text-[9px] uppercase font-black text-slate-400 tracking-tighter">Verified Reviewer</span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2 text-rose-500 font-bold text-[10px] uppercase tracking-tighter bg-rose-50 px-2 py-1 rounded-lg w-fit">
                                                    <span className="relative flex h-2 w-2">
                                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                                                    </span>
                                                    Awaiting HR
                                                </div>
                                            )}
                                        </td>

                                        {/* Column 5: Status Badge */}
                                        <td className="text-right px-6">
                                            {request.requestStatus === 'pending' && <span className="badge badge-warning font-bold text-white px-4 py-3 rounded-xl border-none shadow-sm shadow-amber-100">Pending</span>}
                                            {request.requestStatus === 'approved' && <span className="badge badge-success font-bold text-white px-4 py-3 rounded-xl border-none shadow-sm shadow-emerald-100">Approved</span>}
                                            {request.requestStatus === 'rejected' && <span className="badge badge-error font-bold text-white px-4 py-3 rounded-xl border-none shadow-sm shadow-rose-100">Rejected</span>}
                                            {request.requestStatus === 'returned' && <span className="badge badge-neutral font-bold text-white px-4 py-3 rounded-xl border-none">Returned</span>}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* --- FOOTER / PAGINATION --- */}
            <div className="bg-white p-4 rounded-3xl border border-slate-100 flex justify-center shadow-sm">
                <Pagination
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    itemsPerPage={itemsPerPage}
                    setItemsPerPage={setItemsPerPage}
                    totalCount={totalCount}
                />
            </div>
        </div>
    );
};

export default MyRequest;