import React from 'react';
import AssetCard from './AssetCard';

const AssetGrid = ({ assets, onDelete }) => {
    if (!assets || assets.length === 0) return <div className="text-center p-10">No assets found.</div>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {assets.map((asset) => (
                <AssetCard 
                    key={asset._id} 
                    asset={asset} 
                    onDelete={onDelete} 
                />
            ))}
        </div>
    );
};

export default AssetGrid;