import React from 'react';

const GridContainer = ({assets, onDelete}) => {
    return (
        <div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {assets.map((asset) => (
                    <AssetCard
                        key={asset._id}
                        asset={asset}
                        onDelete={onDelete}
                    />
                ))}
            </div>
        </div>
    );
};

export default GridContainer;