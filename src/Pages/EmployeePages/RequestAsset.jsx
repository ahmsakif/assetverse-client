import React, { useEffect, useState } from 'react';
import GridContainer from '../../Components/DisplayData/GridContainer';
import TableContainer from '../../Components/DisplayData/TableContainer';
import { FaList, FaThLarge, FaSearch } from 'react-icons/fa';
import useAuth from '../../Hooks/useAuth';
import useAxios from '../../Hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import UpdateAssetModal from '../../Components/AssetComponents/UpdateAssetModal';
import RequestTableContainer from '../../Components/RequestAssetComponents/RequestTableContainer';
import toast from 'react-hot-toast';
import RequestAssetModal from '../../Components/RequestAssetComponents/RequestAssetModal';
import Pagination from '../../Utilities/Pagination';


const RequestAsset = () => {

    const { user } = useAuth()
    const axiosInstance = useAxios()

    const [viewMode, setViewMode] = useState('list')
    const [selectedAsset, setSelectedAsset] = useState(null);

    const [search, setSearch] = useState('')
    const [filterType, setFilterType] = useState('');
    const [sortOrder, setSortOrder] = useState('')

    const [currentPage, setCurrentPage] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(10)

    // Fetch Data
    const {
        data: assetsData = { result: [], count: 0 },
        isLoading: assetLoading,
        refetch,
    } = useQuery({

        queryKey: ['request-assets', search, filterType, sortOrder, currentPage, itemsPerPage],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosInstance('/assets', {
                params: {
                    search: search,
                    filter: filterType,
                    sort: sortOrder,
                    page: currentPage,
                    limit: itemsPerPage,
                }
            });
            return res.data
        },
        // onSuccess: () => {
        //     if (assets.length === 0 && currentPage > 0) {
        //         // Automatically go back to the previous page
        //         setCurrentPage(prev => prev - 1);
        //     }
        // }
    })
    const assets = assetsData.result;
    const totalCount = assetsData.count;

    useEffect(() => {
        if (!assetLoading && assets.length === 0 && currentPage > 0) {
            setCurrentPage(prev => prev - 1);
        }
    }, [assets, currentPage, assetLoading]);

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
    }
    console.log(assets);

    return (
        <div>

            <div className='flex justify-between items-center mb-10'>
                <title>Request Asset</title>
                <div>
                    <h2 className="text-4xl font-bold text-primary mb-2">Request Asset</h2>
                    <p className="text text-gray-500">Find and request your company asset</p>
                </div>
                {/* View Toggle */}
                <div className='join border rounded-md border-base-300'>
                    <button
                        className={`btn btn-sm rounded-l-[5px]  join-item ${viewMode === 'list' ? 'btn-active btn-primary' : 'btn-ghost'}`}
                        onClick={() => setViewMode('list')}
                    > <FaList /> </button>
                    <button
                        className={`btn btn-sm rounded-r-[5px] join-item ${viewMode === 'grid' ? 'btn-active btn-primary' : 'btn-ghost'}`}
                        onClick={() => setViewMode('grid')}
                    > <FaThLarge /> </button>
                </div>
            </div>

            {/* --- FILTERS BAR --- */}
            <div className="bg-base-200 p-4 rounded-xl mb-6 flex flex-col md:flex-row gap-4 items-center shadow-sm">

                {/* Search */}
                <label
                    className="input w-full md:w-2/5 ">
                    <svg className="h-[1.2em] opacity-80" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            strokeWidth="2.5"
                            fill="none"
                            stroke="currentColor"
                        >
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.3-4.3"></path>
                        </g>
                    </svg>
                    <input type="search" required placeholder="Search assets..." onChange={handleSearchChange} value={search} />
                </label>

                {/* Filter Type */}
                <select
                    className="select select-bordered w-full md:w-1/5"
                    onChange={handleFilterChange}
                    value={filterType}
                >
                    <option value="">All Types</option>
                    <option value="Returnable">Returnable</option>
                    <option value="Non-returnable">Non-returnable</option>
                </select>

                {/* Sort */}
                <select
                    className="select select-bordered w-full md:w-1/5"
                    onChange={(e) => setSortOrder(e.target.value)}
                    value={sortOrder}
                >
                    <option value="">Sort by Quantity</option>
                    <option value="asc">Low to High</option>
                    <option value="desc">High to Low</option>
                </select>

                {/* Items Per Page */}
                <select
                    className="select select-bordered w-full md:w-1/5"
                    onChange={(e) => {
                        setItemsPerPage(Number(e.target.value))
                        setCurrentPage(0)
                    }}
                >
                    <option value={10}>10 per page</option>
                    <option value={20}>20 per page</option>
                    <option value={50}>50 per page</option>
                </select>
            </div>

            {/* Content Section */}
            {
                viewMode === 'grid' ? (
                    <GridContainer assets={assets} />
                ) : (
                    <RequestTableContainer assets={assets} onRequest={handleRequestAsset} />
                )
            }

            {/* Empty State */}
            {assets.length === 0 && (
                <div className="flex flex-col items-center justify-center py-16 bg-base-100 border-2 border-dashed border-base-300 rounded-xl mt-4">
                    <h3 className="text-lg font-bold text-gray-500">No Assets Found</h3>
                    <p className="text-gray-400">Try adjusting your search or add a new asset.</p>
                </div>
            )}
            <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                itemsPerPage={itemsPerPage}
                setItemsPerPage={itemsPerPage}
                totalCount={totalCount}
            />
            <RequestAssetModal
                asset={selectedAsset}
                setAsset={setSelectedAsset}
            />
        </div>
    );
};

export default RequestAsset;