import React, { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAuth from '../../Hooks/useAuth';
import useAxios from '../../Hooks/useAxios';
import Pagination from '../../Utilities/Pagination';
import LoadingSpinner from '../../Utilities/LoadingSpinner';


const MyEmployees = () => {
    const { user } = useAuth();
    const axiosInstance = useAxios();
    
    // States
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10); // Adjust grid size if needed

    // Fetch Employees (Paginated)
    const { 
        data: employeeData = { result: [], count: 0, packageLimit: 0 }, 
        isLoading, 
        refetch 
    } = useQuery({
        queryKey: ['my-employees', user?.email, search, currentPage, itemsPerPage],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosInstance.get('/my-employees', {
                params: { 
                    email: user.email,
                    search: search,
                    page: currentPage,
                    limit: itemsPerPage
                }
            });
            return res.data;
        }
    });



    const employees = employeeData.result;
    const totalCount = employeeData.count;

    // Handle Remove Member
    const handleRemove = (affiliationId) => {
        Swal.fire({
            title: 'Remove from Team?',
            text: "This will remove the employee from your company list.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            confirmButtonText: 'Yes, Remove'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axiosInstance.delete(`/affiliations/${affiliationId}`);
                    Swal.fire('Removed!', 'Employee has been removed.', 'success');
                    refetch();
                } catch (error) {
                    Swal.fire('Error', 'Failed to remove employee.', 'error');
                }
            }
        });
    };

    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="p-6">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <h2 className="text-3xl font-bold">My Team</h2>
                
                {/* 📊 Package Stats */}
                <div className="stats shadow bg-primary text-primary-content">
                    <div className="stat place-items-center">
                        <div className="stat-title text-primary-content opacity-80">Package Limit</div>
                        <div className="stat-value text-2xl">
                            {totalCount} / {employeeData.packageLimit}
                        </div>
                        <div className="stat-desc text-primary-content opacity-80">Employees Used</div>
                    </div>
                </div>
            </div>

            {/* Search Bar */}
            <div className="mb-8">
                <input 
                    type="text" 
                    placeholder="Search by name or email..." 
                    className="input input-bordered w-full max-w-sm shadow-sm"
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setCurrentPage(0); // Reset to page 1 on search
                    }}
                />
            </div>

            {/* 🔲 Grid View Cards */}
            {employees.length === 0 ? (
                <div className="text-center py-20 opacity-50 bg-base-100 rounded-lg border border-base-200">
                    <h3 className="text-xl font-bold">No employees found.</h3>
                    <p>Invite some team members or adjust your search.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {employees.map((member) => (
                        <div key={member._id} className="card bg-base-100 shadow-xl border border-base-200 hover:shadow-2xl transition-all duration-300">
                            <figure className="px-6 pt-6">
                                <div className="avatar">
                                    <div className="w-50 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2">
                                        <img 
                                            src={member.image || "https://via.placeholder.com/150"} 
                                            alt={member.name} 
                                            className="object-cover"
                                        />
                                    </div>
                                </div>
                            </figure>
                            
                            <div className="card-body items-center text-center">
                                <h2 className="card-title text-xl">{member.name}</h2>
                                <p className="text-sm text-gray-500 mb-2">{member.email}</p>
                                
                                {/* Info Badges */}
                                <div className="flex gap-2 flex-wrap justify-center mb-4">
                                    <div className="badge badge-ghost gap-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-4 h-4 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                        {member.role || 'Member'}
                                    </div>
                                    <div className="badge badge-secondary badge-outline gap-1">
                                        {member.assetsCount} Assets
                                    </div>
                                </div>
                                
                                {/* Additional Details */}
                                <div className="text-xs text-gray-400 w-full flex justify-between px-4 py-2 bg-base-200 rounded-lg mb-4">
                                    <span>Joined in:</span>
                                    <span className="font-semibold text-gray-600">
                                        {member.joinDate ? new Date(member.joinDate).toLocaleDateString() : 'N/A'}
                                    </span>
                                </div>

                                {/* Actions */}
                                <div className="card-actions w-full">
                                    <button 
                                        onClick={() => handleRemove(member._id)}
                                        className="btn btn-error btn-outline btn-sm w-full"
                                    >
                                        Remove from Team
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Pagination Controls */}
            <div className="mt-10">
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