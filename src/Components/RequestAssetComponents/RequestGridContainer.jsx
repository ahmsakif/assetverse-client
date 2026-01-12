import React from 'react';
import RequestAssetCard from '../AssetComponents/RequestAssetCard';

const RequestGridContainer = ({assets, onRequest}) => {
    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                {
                    assets.map(asset=><RequestAssetCard key={asset._id} asset={asset} onRequest={onRequest} />)
                }
            </div>
        </div>
    );
};

export default RequestGridContainer;