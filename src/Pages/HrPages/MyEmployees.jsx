import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Pagination from '../../Utilities/Pagination';
import SkeletonCardLoader from '../../Utilities/SkeletonCardLoader';
import { FaUser , FaSearch, FaCalendarAlt, FaLayerGroup } from 'react-icons/fa';

const MyEmployees = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(12); // Grid looks better with 3 or 4 cols

    const { data: employeeData = { result: [], count: 0, packageLimit: 0 }, isLoading, refetch } = useQuery({
        queryKey: ['my-employees', user?.email, search, currentPage, itemsPerPage],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get('/my-employees', {
                params: { email: user.email, search, page: currentPage, limit: itemsPerPage }
            });
            return res.data;
        }
    });
console.log(employeeData.result);
    const employees = employeeData.result;
    const totalCount = employeeData.count;
    const limit = employeeData.packageLimit;
    const usagePercentage = Math.min(Math.round((totalCount / limit) * 100), 100);

    const handleRemove = (affiliationId) => {
        Swal.fire({
            title: 'Remove team member?',
            text: "They will lose access to company assets immediately.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#64748b',
            confirmButtonText: 'Yes, Remove Member'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axiosSecure.delete(`/affiliations/${affiliationId}`);
                    Swal.fire('Updated', 'Employee removed from team.', 'success');
                    refetch();
                } catch (error) {
                    Swal.fire('Error', 'Action failed. Please try again.', 'error');
                }
            }
        });
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <title>Team Management | AssetVerse</title>

            {/* --- TOP HEADER & STATS --- */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <div className="space-y-1">
                    <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Team Management</h2>
                    <p className="text-slate-500 font-medium">Manage your workforce and asset allocations.</p>
                </div>

                <div className="w-full lg:w-72 space-y-2">
                    <div className="flex justify-between text-sm font-bold">
                        <span className="text-slate-500 uppercase tracking-wider">Package Capacity</span>
                        <span className={usagePercentage > 90 ? "text-error" : "text-primary"}>
                            {totalCount} / {limit}
                        </span>
                    </div>
                    <progress 
                        className={`progress w-full h-3 ${usagePercentage > 90 ? "progress-error" : "progress-primary"}`} 
                        value={totalCount} 
                        max={limit}
                    ></progress>
                    <p className="text-[10px] text-slate-400 text-right uppercase font-bold tracking-tighter">
                        {limit - totalCount} Slots remaining
                    </p>
                </div>
            </div>

            {/* --- SEARCH & ACTIONS --- */}
            <div className="flex justify-start">
                <div className="relative w-full max-w-md group">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" />
                    <input
                        type="search"
                        placeholder="Search by name or email..."
                        className="input input-bordered w-full pl-12 rounded-2xl bg-white border-slate-200 focus:ring-4 focus:ring-primary/10 transition-all"
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setCurrentPage(0);
                        }}
                    />
                </div>
            </div>

            {/* --- EMPLOYEES GRID --- */}
            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {[...Array(8)].map((_, i) => <SkeletonCardLoader key={i} />)}
                </div>
            ) : employees.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
                    <div className="bg-slate-50 p-6 rounded-full mb-4">
                        <FaUser Friends className="text-5xl text-slate-300" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-700">No members found</h3>
                    <p className="text-slate-400">Try adjusting your search or invite new members.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {employees.map((member) => (
                        <div key={member._id} className="group bg-white rounded-3xl border border-slate-100 p-6 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 relative overflow-hidden">
                            {/* Status Ribbon */}
                            <div className="absolute top-0 right-0 w-16 h-16">
                                <div className="absolute transform rotate-45 bg-slate-50 text-slate-400 text-[10px] font-bold py-1 right-[-35px] top-[15px] w-[120px] text-center uppercase tracking-widest border-b border-slate-100">
                                    Active
                                </div>
                            </div>

                            <div className="flex flex-col items-center">
                                <div className="avatar mb-4">
                                    <div className="w-24 h-24 rounded-2xl ring ring-slate-50 ring-offset-base-100 ring-offset-4 group-hover:scale-105 transition-transform">
                                        <img src={member.image || "https://i.ibb.co/pL1p6w4/user.png"} alt={member.name} />
                                    </div>
                                </div>

                                <div className="text-center space-y-1 mb-6">
                                    <h3 className="font-black text-lg text-slate-800 line-clamp-1">{member.name}</h3>
                                    <p className="text-xs font-medium text-slate-400 truncate w-44">{member.email}</p>
                                </div>

                                <div className="w-full grid grid-cols-2 gap-2 mb-6">
                                    <div className="bg-slate-50 p-3 rounded-2xl text-center">
                                        <div className="flex justify-center text-indigo-500 mb-1"><FaLayerGroup size={14}/></div>
                                        <p className="text-[10px] uppercase font-black text-slate-400">Assets</p>
                                        <p className="text-sm font-bold text-slate-700">{member.assetsCount}</p>
                                    </div>
                                    <div className="bg-slate-50 p-3 rounded-2xl text-center">
                                        <div className="flex justify-center text-emerald-500 mb-1"><FaCalendarAlt size={14}/></div>
                                        <p className="text-[10px] uppercase font-black text-slate-400">Joined</p>
                                        <p className="text-sm font-bold text-slate-700">{new Date(member.joinDate).getFullYear()}</p>
                                    </div>
                                </div>

                                <button
                                    onClick={() => handleRemove(member._id)}
                                    className="btn btn-ghost btn-sm w-full text-slate-400 hover:text-error hover:bg-error/10 rounded-xl gap-2 transition-colors"
                                >
                                    <FaUser Minus size={14} />
                                    <span className="text-[11px] font-bold uppercase tracking-wider">Remove Member</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* --- FOOTER / PAGINATION --- */}
            <div className="bg-white p-4 rounded-2xl border border-slate-100 flex justify-center shadow-sm">
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

export default MyEmployees;