import React from 'react';
import AssetCard from '../AssetComponents/AssetCard';

const GridContainer = ({assets, onDelete, onUpdate}) => {
    return (
        <div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {assets.map((asset) => (
                    <AssetCard
                        key={asset._id}
                        asset={asset}
                        onDelete={onDelete}
                        onUpdate={onUpdate}
                    />
                ))}
            </div>
        </div>
    );
};

export default GridContainer;