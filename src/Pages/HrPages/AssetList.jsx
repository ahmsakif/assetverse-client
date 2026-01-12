import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { FaList, FaThLarge, FaSearch, FaFilter, FaSortAmountDown, FaBoxOpen, FaLayerGroup } from 'react-icons/fa';

import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import GridContainer from '../../Components/DisplayData/GridContainer';
import TableContainer from '../../Components/DisplayData/TableContainer';
import UpdateAssetModal from '../../Components/AssetComponents/UpdateAssetModal';
import Pagination from '../../Utilities/Pagination';
import SkeletonCardLoader from '../../Utilities/SkeletonCardLoader'; // Assuming you have this

const AssetList = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    // UI States
    const [viewMode, setViewMode] = useState('list');
    const [editingAsset, setEditingAsset] = useState(null);

    // Filter States
    const [search, setSearch] = useState('');
    const [filterType, setFilterType] = useState('');
    const [sortOrder, setSortOrder] = useState('');

    // Pagination States
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    // 1. Fetch Data
    const {
        data: assetsData = { result: [], count: 0 },
        isLoading: assetLoading,
        refetch,
    } = useQuery({
        queryKey: ['assets', user?.email, search, filterType, sortOrder, currentPage, itemsPerPage],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get('/assets', {
                params: {
                    email: user.email,
                    search,
                    filter: filterType,
                    sort: sortOrder,
                    page: currentPage,
                    limit: itemsPerPage,
                }
            });
            return res.data;
        }
    });

    const assets = assetsData.result;
    const totalCount = assetsData.count;

    // 2. Auto-pagination Logic
    useEffect(() => {
        if (!assetLoading && assets.length === 0 && currentPage > 0) {
            setCurrentPage(prev => prev - 1);
        }
    }, [assets, currentPage, assetLoading]);

    // 3. Handlers
    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        setCurrentPage(0);
    };

    const handleFilterChange = (e) => {
        setFilterType(e.target.value);
        setCurrentPage(0);
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Delete Asset?",
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444", // Red-500
            cancelButtonColor: "#64748b", // Slate-500
            confirmButtonText: "Yes, delete it",
            customClass: { popup: 'rounded-3xl' }
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.delete(`/assets/${id}`);
                    if (res.data.deletedCount) {
                        refetch();
                        Swal.fire({
                            title: "Deleted!",
                            text: "Asset removed from inventory.",
                            icon: "success",
                            timer: 1500,
                            showConfirmButton: false,
                            customClass: { popup: 'rounded-3xl' }
                        });
                    }
                } catch (error) {
                    console.error(error);
                    Swal.fire({ title: "Error", text: "Failed to delete.", icon: "error" });
                }
            }
        });
    };

    const openEditModal = (asset) => {
        setEditingAsset(asset);
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <title>Inventory | AssetVerse</title>

            {/* --- TOP HEADER SECTION --- */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                <div className="space-y-1">
                    <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Company Inventory</h2>
                    <p className="text-slate-500 font-medium">Manage stock, track assets, and update product details.</p>
                </div>

                {/* --- VIEW TOGGLE --- */}
                <div className="bg-slate-50 p-1 rounded-2xl border border-slate-200 flex gap-1">
                    <button
                        onClick={() => setViewMode('grid')}
                        className={`btn btn-sm h-10 px-5 rounded-xl border-none gap-2 transition-all duration-300 ${viewMode === 'grid' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-transparent text-slate-400 hover:bg-slate-200'}`}
                    >
                        <FaThLarge /> <span className="text-[10px] font-black uppercase tracking-widest">Grid</span>
                    </button>
                    <button
                        onClick={() => setViewMode('list')}
                        className={`btn btn-sm h-10 px-5 rounded-xl border-none gap-2 transition-all duration-300 ${viewMode === 'list' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-transparent text-slate-400 hover:bg-slate-200'}`}
                    >
                        <FaList /> <span className="text-[10px] font-black uppercase tracking-widest">List</span>
                    </button>
                </div>
            </div>

            {/* --- FILTERS BAR --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-white/50 backdrop-blur-md rounded-3xl border border-slate-100 shadow-sm">
                
                {/* Search Field */}
                <div className="relative group lg:col-span-1">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" />
                    <input 
                        type="search" 
                        placeholder="Search assets..." 
                        className="input input-bordered w-full pl-12 rounded-2xl bg-white border-slate-200 focus:ring-4 focus:ring-primary/10 transition-all"
                        onChange={handleSearchChange} 
                        value={search} 
                    />
                </div>

                {/* Filter Category */}
                <div className="relative group">
                    <FaFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors pointer-events-none" />
                    <select
                        className="select select-bordered w-full pl-12 rounded-2xl bg-white border-slate-200 focus:ring-4 focus:ring-primary/10 appearance-none"
                        onChange={handleFilterChange}
                        value={filterType}
                    >
                        <option value="">All Categories</option>
                        <option value="Returnable">Returnable</option>
                        <option value="Non-returnable">Non-returnable</option>
                    </select>
                </div>

                {/* Sort Logic */}
                <div className="relative group">
                    <FaSortAmountDown className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors pointer-events-none" />
                    <select
                        className="select select-bordered w-full pl-12 rounded-2xl bg-white border-slate-200 focus:ring-4 focus:ring-primary/10 appearance-none"
                        onChange={(e) => setSortOrder(e.target.value)}
                        value={sortOrder}
                    >
                        <option value="">Sort: Quantity</option>
                        <option value="asc">Stock: Low to High</option>
                        <option value="desc">Stock: High to Low</option>
                    </select>
                </div>

                {/* Items Control */}
                <div className="relative group">
                    <select
                        className="select select-bordered w-full rounded-2xl bg-white border-slate-200 focus:ring-4 focus:ring-primary/10"
                        onChange={(e) => {
                            setItemsPerPage(Number(e.target.value));
                            setCurrentPage(0);
                        }}
                        value={itemsPerPage}
                    >
                        <option value={10}>10 Per Page</option>
                        <option value={20}>20 Per Page</option>
                        <option value={50}>50 Per Page</option>
                    </select>
                </div>
            </div>

            {/* --- CONTENT SECTION --- */}
            <div className="min-h-[500px]">
                {assetLoading ? (
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {/* Assuming SkeletonCardLoader handles card shapes, usually you map it */}
                        {[...Array(itemsPerPage)].map((_, i) => <SkeletonCardLoader key={i} />)}
                     </div>
                ) : assets.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 bg-white rounded-[2rem] border-2 border-dashed border-slate-200 shadow-inner">
                        <div className="bg-slate-50 p-6 rounded-full mb-4">
                            <FaBoxOpen className="text-5xl text-slate-200" />
                        </div>
                        <h3 className="text-xl font-black text-slate-700">No inventory found</h3>
                        <p className="text-slate-400 font-medium">Try adding a new asset or changing your filters.</p>
                    </div>
                ) : (
                    <>
                        {viewMode === 'grid' ? (
                            <GridContainer assets={assets} onDelete={handleDelete} onUpdate={openEditModal} />
                        ) : (
                            <TableContainer assets={assets} onDelete={handleDelete} onUpdate={openEditModal} />
                        )}
                    </>
                )}
            </div>

            {/* --- PAGINATION --- */}
            {totalCount > 0 && (
                <div className="bg-white p-4 rounded-3xl border border-slate-100 flex justify-center shadow-sm">
                    <Pagination
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        itemsPerPage={itemsPerPage}
                        totalCount={totalCount}
                        setItemsPerPage={setItemsPerPage} // If your pagination component supports this
                    />
                </div>
            )}

            {/* --- UPDATE MODAL --- */}
            {editingAsset && (
                <UpdateAssetModal
                    asset={editingAsset}
                    refetch={refetch}
                    setEditingAsset={setEditingAsset}
                />
            )}
        </div>
    );
};

export default AssetList;