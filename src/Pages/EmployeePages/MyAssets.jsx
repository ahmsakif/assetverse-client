import React, { useState, useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

import useAuth from '../../Hooks/useAuth';
import useAxios from '../../Hooks/useAxios';
import Pagination from '../../Utilities/Pagination';

const MyAssets = () => {
    const { user } = useAuth();
    const axiosInstance = useAxios();

    // States
    const [search, setSearch] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [filterType, setFilterType] = useState(''); // 'Returnable' or 'Non-returnable'
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

    // Fetch Data from the new '/my-assets' endpoint
    const { 
        data: assetsData = { result: [], count: 0 }, 
        isLoading,
        refetch 
    } = useQuery({
        queryKey: ['my-assets', user?.email, searchQuery, filterType, currentPage, itemsPerPage],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosInstance.get('/my-assets', {
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

    // Handle Return Logic
    const handleReturn = (item) => {
        Swal.fire({
            title: 'Return Asset?',
            text: "This will mark the asset as returned. You cannot undo this.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, Return it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    // Note: We send 'assignedAssetId' (the _id of this doc) and 'assetId' (original product)
                    const res = await axiosInstance.post('/return-asset', {
                        assignedAssetId: item._id, 
                        assetId: item.assetId      
                    });

                    if (res.data.modifiedCount > 0) {
                        Swal.fire('Returned!', 'Asset returned successfully.', 'success');
                        refetch();
                    }
                } catch (error) {
                    console.error(error);
                    Swal.fire('Error', 'Failed to return asset.', 'error');
                }
            }
        });
    };

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-6">My Assigned Assets</h2>

            {/* Controls Section */}
            <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between">
                {/* Search Input */}
                <input 
                    type="text" 
                    placeholder="Search asset name..." 
                    className="input input-bordered w-full md:w-1/3"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                {/* Filter Dropdown */}
                <select 
                    className="select select-bordered w-full md:w-1/4"
                    onChange={(e) => {
                        setFilterType(e.target.value);
                        setCurrentPage(0);
                    }}
                    value={filterType}
                >
                    <option value="">All Types</option>
                    <option value="Returnable">Returnable</option>
                    <option value="Non-returnable">Non-returnable</option>
                </select>
            </div>

            {/* Table Section */}
            <div className="overflow-x-auto bg-base-100 shadow-md rounded-lg border border-base-200">
                <table className="table">
                    {/* Table Head */}
                    <thead className="bg-base-200">
                        <tr>
                            <th>Asset Name</th>
                            <th>Type</th>
                            <th>Assignment Date</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    
                    {/* Table Body */}
                    <tbody>
                        {isLoading ? (
                            <tr><td colSpan="5" className="text-center py-10"><span className="loading loading-spinner loading-lg"></span></td></tr>
                        ) : myAssets.length === 0 ? (
                            <tr><td colSpan="5" className="text-center py-10 opacity-50">No assigned assets found.</td></tr>
                        ) : (
                            myAssets.map((item) => (
                                <tr key={item._id} className="hover">
                                    <td className="font-bold">{item.assetName}</td>
                                    <td>
                                        <div className="badge badge-ghost badge-sm">{item.assetType}</div>
                                    </td>
                                    <td>{new Date(item.assignmentDate).toLocaleDateString()}</td>
                                    <td>
                                        {item.status === 'returned' ? (
                                            <div className="badge badge-warning">Returned</div>
                                        ) : (
                                            <div className="badge badge-success text-white">Assigned</div>
                                        )}
                                    </td>
                                    <td>
                                        {/* Action Column Logic */}
                                        {item.status === 'returned' ? (
                                            <span className="text-xs text-gray-400 italic">Already Returned</span>
                                        ) : (
                                            <>
                                                {item.assetType === 'Returnable' ? (
                                                    <button 
                                                        onClick={() => handleReturn(item)}
                                                        className="btn btn-xs btn-error text-white"
                                                    >
                                                        Return
                                                    </button>
                                                ) : (
                                                    <span className="text-xs text-gray-500">Non-returnable</span>
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

            {/* Pagination Component */}
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

export default MyAssets;