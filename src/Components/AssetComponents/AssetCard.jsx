import React from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const AssetCard = ({ asset, onDelete, onUpdate }) => {
    // 1. Destructure availableQuantity
    const { _id, productName, productImage, productType, productQuantity, availableQuantity, dateAdded } = asset;

    return (
        <div className="card bg-base-100 shadow-sm hover:shadow-xl transition-shadow duration-300 border border-base-200">
            <figure className="h-48 w-full overflow-hidden bg-white p-4">
                <img 
                    src={productImage || "https://via.placeholder.com/150"} 
                    alt={productName} 
                    className="h-full w-full object-contain hover:scale-105 transition-transform duration-300"
                />
            </figure>
            <div className="card-body p-5">
                <h2 className="card-title text-base justify-between">
                    <span className="truncate" title={productName}>{productName}</span>
                    <div className={`badge badge-sm text-xs shrink-0 ${productType === 'Returnable' ? 'badge-error badge-outline' : 'badge-success badge-outline'}`}>
                        {productType === 'Returnable' ? 'Ret.' : 'Non-Ret.'}
                    </div>
                </h2>
                
                {/* Stats Container */}
                <div className="text-sm text-gray-500 space-y-1 mt-3 bg-base-200/50 p-3 rounded-lg">
                    
                    {/* Row 1: Total Quantity */}
                    <div className="flex justify-between">
                        <span>Total Quantity:</span>
                        <span className="font-bold text-base-content">{productQuantity}</span>
                    </div>

                    {/* Row 2: Available Quantity (New) */}
                    <div className="flex justify-between">
                        <span>Available:</span>
                        {/* 2. Color Logic: Green if available, Red if 0 */}
                        <span className={`font-bold ${availableQuantity > 0 ? 'text-success' : 'text-error'}`}>
                            {availableQuantity !== undefined ? availableQuantity : productQuantity} 
                            {/* Fallback to productQuantity if availableQuantity is missing in DB */}
                        </span>
                    </div>

                    {/* Row 3: Date (Added a top border to separate it slightly) */}
                    <div className="flex justify-between text-xs pt-2 mt-2 border-t border-base-content/10">
                        <span>Added:</span>
                        <span>{new Date(dateAdded).toLocaleDateString()}</span>
                    </div>
                </div>

                <div className="card-actions justify-end mt-4 pt-3 border-t border-base-200">
                    <button className="btn btn-sm btn-square btn-ghost hover:text-primary" title="Edit">
                        <FaEdit onClick={()=>onUpdate(asset)} className="size-5" />
                    </button>
                    <button 
                        onClick={() => onDelete(_id)} 
                        className="btn btn-sm btn-square btn-ghost hover:text-error"
                        title="Delete"
                    >
                        <FaTrashAlt className="size-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AssetCard;