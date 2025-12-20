import React from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const AssetRow = ({ asset, onDelete }) => {
    const { _id, productName, productImage, productType, productQuantity, dateAdded } = asset;

    return (
        <tr className="hover">
            <td>
                <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12 bg-base-200">
                        <img src={productImage || "https://via.placeholder.com/40"} alt={productName} />
                    </div>
                </div>
            </td>
            <td className="font-bold text-base-content">{productName}</td>
            <td>
                <span className={`badge ${productType === 'Returnable' ? 'badge-error' : 'badge-success'} badge-outline`}>
                    {productType}
                </span>
            </td>
            <td className="font-medium">{productQuantity}</td>
            <td className="text-gray-500">{new Date(dateAdded).toLocaleDateString()}</td>
            <td className="flex gap-2">
                <button className="btn btn-sm btn-square btn-info btn-outline">
                    <FaEdit />
                </button>
                <button 
                    onClick={() => onDelete(_id)} 
                    className="btn btn-sm btn-square btn-error btn-outline"
                >
                    <FaTrashAlt />
                </button>
            </td>
        </tr>
    );
};

export default AssetRow;