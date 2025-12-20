import React from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const AssetRow = ({ asset, index, onDelete }) => {
    const { _id, productName, productImage, productType, productQuantity, dateAdded, availableQuantity } = asset;
    console.log(asset);

    return (
        // Added 'flex gap-4' to ensure it behaves like a standard row
        <li className="list-row flex items-center gap-4 p-4 hover:bg-base-200 transition-colors duration-200 border-b border-base-200 last:border-none">
            
            {/* Column 0: Sl */}
            <div className="w-8 font-bold opacity-60 text-sm">
                {index + 1}
            </div>

            {/* Column 1: Image (Fixed Width) */}
            <div className="w-14">
                <img 
                    className="size-12 rounded-lg object-cover border border-base-300 bg-base-100" 
                    src={productImage || "https://via.placeholder.com/150"} 
                    alt={productName} 
                />
            </div>

            {/* Column 2: Name (FLEX-1: This makes it fill the empty space) */}
            <div className="flex-1 min-w-0"> {/* min-w-0 prevents text overflow issues */}
                <div className="font-bold text-base truncate" title={productName}>
                    {productName}
                </div>
                <div className="text-xs uppercase opacity-50 font-semibold tracking-wider">
                    ID: {_id.slice(-4)}
                </div>
            </div>

            {/* Column 3: Type */}
            <div className="w-28 flex justify-center">
                <div className={`badge badge-sm ${productType === 'Returnable' ? 'badge-error badge-outline' : 'badge-success badge-outline'}`}>
                    {productType}
                </div>
            </div>

            {/* Column 4: Quantity */}
            <div className="w-16 text-center font-mono text-lg opacity-80">
                {productQuantity}
            </div>

            {/* Column 5: Available Quantity */}
            <div className="w-16 text-center font-mono text-lg opacity-80">
                {availableQuantity}
            </div>

            {/* Column 6: Date */}
            <div className="w-24 gap-2 flex flex-col text-center text-xs opacity-60">
                <span>{new Date(dateAdded).toLocaleDateString()}</span>
                <span>{new Date(dateAdded).toLocaleTimeString()}</span>
            </div>

            {/* Column 7: Actions */}
            <div className="w-20 flex gap-2 justify-end">
                <button className="btn btn-square btn-ghost btn-sm hover:text-primary">
                    <FaEdit className="size-4" />
                </button>
                <button 
                    onClick={() => onDelete(_id)} 
                    className="btn btn-square btn-ghost btn-sm hover:text-error"
                >
                    <FaTrashAlt className="size-4" />
                </button>
            </div>
        </li>
    );
};

export default AssetRow;