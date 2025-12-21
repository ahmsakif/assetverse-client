import React from 'react';

const RequestAssetCard = ({ asset, onRequest }) => {
    const { productName, productImage, productType, availableQuantity } = asset;
    const isOutOfStock = availableQuantity <= 0;

    return (
        <div className="card bg-base-100 shadow-sm border border-base-200 hover:shadow-lg transition-all duration-300">
            <figure className="h-48 px-4 pt-4 bg-white overflow-hidden">
                <img 
                    src={productImage} 
                    alt={productName} 
                    className="rounded-xl h-full w-full object-contain hover:scale-105 transition-transform" 
                />
            </figure>
            <div className="card-body p-5">
                <h2 className="card-title justify-between text-base">
                    <span className="truncate" title={productName}>{productName}</span>
                    <div className={`badge badge-sm ${productType === 'Returnable' ? 'badge-warning' : 'badge-accent'} badge-outline`}>
                        {productType === 'Returnable' ? 'Ret.' : 'Non-Ret.'}
                    </div>
                </h2>
                
                <div className="text-sm text-gray-500 mt-2 flex justify-between items-center bg-base-200/50 p-2 rounded-lg">
                    <span>Availability:</span>
                    <span className={`font-bold ${!isOutOfStock ? 'text-success' : 'text-error'}`}>
                        {!isOutOfStock ? `${availableQuantity} In Stock` : 'Out of Stock'}
                    </span>
                </div>

                <div className="card-actions justify-end mt-4">
                    <button 
                        className="btn btn-primary btn-sm w-full"
                        disabled={isOutOfStock}
                        onClick={() => onRequest(asset)}
                    >
                        {isOutOfStock ? 'Unavailable' : 'Request Asset'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RequestAssetCard;