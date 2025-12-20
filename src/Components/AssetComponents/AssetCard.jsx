import React from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const AssetCard = ({ asset, onDelete }) => {
    const { _id, productName, productImage, productType, productQuantity, dateAdded } = asset;

    return (
        <div className="card bg-base-100 shadow-xl border border-base-200 hover:shadow-2xl transition-all duration-300">
            <figure className="h-48 w-full overflow-hidden bg-white p-4">
                <img 
                    src={productImage || "https://via.placeholder.com/150"} 
                    alt={productName} 
                    className="h-full w-full object-contain"
                />
            </figure>
            <div className="card-body p-5">
                <h2 className="card-title text-lg justify-between">
                    {productName}
                    <div className={`badge text-xs ${productType === 'Returnable' ? 'badge-error badge-outline' : 'badge-success badge-outline'}`}>
                        {productType === 'Returnable' ? 'Returnable' : 'Non-Ret'}
                    </div>
                </h2>
                <div className="text-sm text-gray-500 space-y-1 mt-2">
                    <p>Quantity: <span className="font-bold text-base-content">{productQuantity}</span></p>
                    <p>Added: {new Date(dateAdded).toLocaleDateString()}</p>
                </div>
                <div className="card-actions justify-end mt-4 pt-4 border-t border-base-200">
                    <button className="btn btn-sm btn-info btn-outline">
                        <FaEdit />
                    </button>
                    <button 
                        onClick={() => onDelete(_id)} 
                        className="btn btn-sm btn-error btn-outline"
                    >
                        <FaTrashAlt />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AssetCard;