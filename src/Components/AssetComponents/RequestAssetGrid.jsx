import React from 'react';
import RequestAssetCard from './RequestAssetCard';


const RequestAssetGrid = ({ assets, onRequest }) => {
    if (!assets || assets.length === 0) {
        return <div className="text-center py-10 text-gray-500 col-span-full">No assets found.</div>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {assets.map((asset) => (
                <RequestAssetCard 
                    key={asset._id} 
                    asset={asset} 
                    onRequest={onRequest} 
                />
            ))}
        </div>
    );
};

export default RequestAssetGrid;