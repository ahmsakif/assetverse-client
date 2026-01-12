import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaList, FaThLarge, FaSearch, FaFilter, FaSortAmountDown, FaLayerGroup } from 'react-icons/fa';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import RequestTableContainer from '../../Components/RequestAssetComponents/RequestTableContainer';
import RequestGridContainer from '../../Components/RequestAssetComponents/RequestGridContainer';
import RequestAssetModal from '../../Components/RequestAssetComponents/RequestAssetModal';
import Pagination from '../../Utilities/Pagination';
import SkeletonCardLoader from '../../Utilities/SkeletonCardLoader';

const RequestAsset = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    // UI States
    const [viewMode, setViewMode] = useState('grid');
    const [selectedAsset, setSelectedAsset] = useState(null);

    // Filter States
    const [search, setSearch] = useState('');
    const [filterType, setFilterType] = useState('');
    const [sortOrder, setSortOrder] = useState('');

    // Pagination States
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(12); // Best for 3 or 4 column grids

    // 1. Fetch Data
    const {
        data: assetsData = { result: [], count: 0 },
        isLoading: assetLoading,
    } = useQuery({
        queryKey: ['request-assets', search, filterType, sortOrder, currentPage, itemsPerPage],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get('/assets', {
                params: {
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

    // 2. Auto-pagination adjustment
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

    const handleRequestAsset = (id) => {
        const assetToRequest = assets.find(asset => asset._id === id);
        setSelectedAsset(assetToRequest);
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <title>Request Assets | AssetVerse</title>

            {/* --- TOP HEADER SECTION --- */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                <div className="space-y-1">
                    <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Request Equipment</h2>
                    <p className="text-slate-500 font-medium">Browse through your company's available inventory and make a request.</p>
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
                        className="select select-bordered w-full pl-12 rounded-2xl bg-white border-slate-200 focus:ring-4 focus:ring-primary/10"
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
                        className="select select-bordered w-full pl-12 rounded-2xl bg-white border-slate-200 focus:ring-4 focus:ring-primary/10"
                        onChange={(e) => setSortOrder(e.target.value)}
                        value={sortOrder}
                    >
                        <option value="">Sort: Default</option>
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
                    >
                        <option value={12}>12 Per Page</option>
                        <option value={24}>24 Per Page</option>
                        <option value={48}>48 Per Page</option>
                    </select>
                </div>
            </div>

            {/* --- CONTENT SECTION --- */}
            {assetLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {[...Array(8)].map((_, i) => <SkeletonCardLoader key={i} />)}
                </div>
            ) : assets.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 bg-white rounded-[2rem] border-2 border-dashed border-slate-200 shadow-inner">
                    <div className="bg-slate-50 p-6 rounded-full mb-4">
                        <FaLayerGroup className="text-5xl text-slate-200" />
                    </div>
                    <h3 className="text-xl font-black text-slate-700">No assets found</h3>
                    <p className="text-slate-400 font-medium">Try adjusting your filters or search terms.</p>
                </div>
            ) : (
                <div className="min-h-[500px]">
                    {viewMode === 'grid' ? (
                        <RequestGridContainer assets={assets} onRequest={handleRequestAsset}/>
                    ) : (
                        <RequestTableContainer assets={assets} onRequest={handleRequestAsset} />
                    )}
                </div>
            )}

            {/* --- FOOTER & PAGINATION --- */}
            <div className="bg-white p-4 rounded-3xl border border-slate-100 flex justify-center shadow-sm">
                <Pagination
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    itemsPerPage={itemsPerPage}
                    totalCount={totalCount}
                />
            </div>

            {/* MODAL INTEGRATION */}
            <RequestAssetModal
                asset={selectedAsset}
                setAsset={setSelectedAsset}
            />
        </div>
    );
};

export default RequestAsset;