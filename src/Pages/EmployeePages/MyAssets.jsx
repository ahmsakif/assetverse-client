import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAuth from '../../Hooks/useAuth';
import Pagination from '../../Utilities/Pagination';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { FaSearch, FaBox, FaUndoAlt, FaHistory, FaFilter } from 'react-icons/fa';

const MyAssets = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    // States
    const [search, setSearch] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [filterType, setFilterType] = useState(''); 
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

    // Fetch Data
    const { 
        data: assetsData = { result: [], count: 0 }, 
        isLoading,
        refetch 
    } = useQuery({
        queryKey: ['my-assets', user?.email, searchQuery, filterType, currentPage, itemsPerPage],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get('/my-assets', {
                params: {
                    email: user.email,
                    search: searchQuery,
                    type: filterType,
                    page: currentPage,
                    limit: itemsPerPage
                }
            });
            return res.data;
        }
    });

    const myAssets = assetsData.result;
    const totalCount = assetsData.count;
console.log(myAssets);
    // Handle Return Logic
    const handleReturn = (item) => {
        Swal.fire({
            title: 'Return this asset?',
            text: "It will be added back to the company inventory.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3b82f6',
            cancelButtonColor: '#64748b',
            confirmButtonText: 'Yes, Return it'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.patch(`/assets/return/${item._id}`, {
                        assetId: item.assetId
                    });

                    if (res.data.modifiedCount > 0) {
                        Swal.fire('Success!', 'Asset returned successfully.', 'success');
                        refetch();
                    }
                } catch (error) {
                    Swal.fire('Error', 'Failed to process return.', 'error');
                }
            }
        });
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <title>My Assets | AssetVerse</title>

            {/* --- TOP HEADER --- */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <div className="space-y-1">
                    <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Assigned Assets</h2>
                    <p className="text-slate-500 font-medium">Track and manage equipment currently assigned to you.</p>
                </div>
                <div className="bg-blue-50 px-6 py-3 rounded-2xl border border-blue-100 hidden lg:block">
                    <div className="flex items-center gap-3">
                        <FaBox className="text-blue-600" />
                        <span className="text-sm font-bold text-blue-900">{totalCount} Active Items</span>
                    </div>
                </div>
            </div>

            {/* --- FILTERS SECTION --- */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1 group">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" />
                    <input 
                        type="text" 
                        placeholder="Search asset name..." 
                        className="input input-bordered w-full pl-12 rounded-2xl bg-white border-slate-200 focus:ring-4 focus:ring-primary/10 transition-all"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="relative md:w-64 group">
                    <FaFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors pointer-events-none" />
                    <select 
                        className="select select-bordered w-full pl-12 rounded-2xl bg-white border-slate-200 focus:ring-4 focus:ring-primary/10 appearance-none"
                        onChange={(e) => {
                            setFilterType(e.target.value);
                            setCurrentPage(0);
                        }}
                        value={filterType}
                    >
                        <option value="">All Categories</option>
                        <option value="Returnable">Returnable</option>
                        <option value="Non-returnable">Non-returnable</option>
                    </select>
                </div>
            </div>

            {/* --- TABLE SECTION --- */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr className="bg-slate-50/50 text-slate-500 uppercase text-[11px] font-black tracking-widest border-b border-slate-100">
                                <th className="py-5 px-6">Asset Details</th>
                                <th>Category</th>
                                <th>Assignment Date</th>
                                <th>Status</th>
                                <th className="text-right px-6">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {isLoading ? (
                                <tr>
                                    <td colSpan="5" className="py-20 text-center">
                                        <span className="loading loading-spinner loading-lg text-primary"></span>
                                    </td>
                                </tr>
                            ) : myAssets.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="py-20 text-center">
                                        <div className="flex flex-col items-center opacity-40">
                                            <FaBox size={48} className="mb-4" />
                                            <p className="text-lg font-bold">No assets found</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                myAssets.map((item) => (
                                    <tr key={item._id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
                                                    <img src={item.assetImage} alt="" />
                                                </div>
                                                <span className="font-bold text-slate-700">{item.assetName}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <span className={`badge badge-sm font-bold gap-1 px-3 py-3 border-none ${
                                                item.assetType === 'Returnable' 
                                                ? 'bg-blue-100 text-blue-700' 
                                                : 'bg-emerald-100 text-emerald-700'
                                            }`}>
                                                {item.assetType}
                                            </span>
                                        </td>
                                        <td className="text-slate-500 font-medium">
                                            {new Date(item.assignmentDate).toLocaleDateString('en-US', {
                                                month: 'short', day: 'numeric', year: 'numeric'
                                            })}
                                        </td>
                                        <td>
                                            {item.status === 'returned' ? (
                                                <div className="flex items-center gap-2 text-amber-600 font-bold text-xs uppercase tracking-tighter bg-amber-50 w-fit px-3 py-1 rounded-full border border-amber-100">
                                                    <FaHistory size={10} /> Returned
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-tighter bg-emerald-50 w-fit px-3 py-1 rounded-full border border-emerald-100">
                                                    <FaCheckCircle size={10} /> Active
                                                </div>
                                            )}
                                        </td>
                                        <td className="text-right px-6">
                                            {item.status === 'returned' ? (
                                                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest italic">Inventory Updated</span>
                                            ) : (
                                                <>
                                                    {item.assetType === 'Returnable' ? (
                                                        <button 
                                                            onClick={() => handleReturn(item)}
                                                            className="btn btn-sm btn-outline btn-error rounded-xl gap-2 hover:text-white transition-all shadow-sm"
                                                        >
                                                            <FaUndoAlt size={12} />
                                                            Return Item
                                                        </button>
                                                    ) : (
                                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Ownership Permanent</span>
                                                    )}
                                                </>
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
        </div>
    );
};

// Internal icon fix if FaCheckCircle isn't imported from main library
const FaCheckCircle = ({ size, className }) => (
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height={size} width={size} className={className}>
        <path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.248-16.379-6.248-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.248 16.379 6.248 22.628 0z"></path>
    </svg>
);

export default MyAssets;