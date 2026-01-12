import React from 'react';
import { FaEdit, FaTrashAlt, FaCalendarAlt, FaBoxOpen } from 'react-icons/fa';

const AssetCard = ({ asset, onDelete, onUpdate }) => {
    const { _id, productName, productImage, productType, productQuantity, availableQuantity, dateAdded } = asset;

    // Calculate Stock Percentage
    const stockPercent = Math.min((availableQuantity / productQuantity) * 100, 100);
    const isLowStock = availableQuantity < 3;

    return (
        <div className="group relative bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:border-primary/20 transition-all duration-500 overflow-hidden flex flex-col h-full">
            
            {/* --- IMAGE SECTION --- */}
            <figure className="relative h-52 p-8 bg-slate-50/50 flex items-center justify-center overflow-hidden">
                {/* Status Badge (Top Right) */}
                <div className="absolute top-4 right-4 z-10">
                    <span className={`badge border-none font-black text-[10px] uppercase tracking-widest px-3 py-3 shadow-sm ${
                        productType === 'Returnable' 
                        ? 'bg-indigo-50 text-indigo-500' 
                        : 'bg-emerald-50 text-emerald-500'
                    }`}>
                        {productType}
                    </span>
                </div>

                <img 
                    src={productImage || "https://i.ibb.co/pL1p6w4/asset-placeholder.png"} 
                    alt={productName} 
                    className="h-full w-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" 
                />
            </figure>

            {/* --- CONTENT SECTION --- */}
            <div className="p-6 flex flex-col flex-grow">
                
                {/* Header */}
                <div className="mb-6">
                    <h2 className="text-xl font-black text-slate-800 leading-tight line-clamp-2 min-h-[3.5rem]" title={productName}>
                        {productName}
                    </h2>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                        ID: {_id.slice(-6)}
                    </p>
                </div>

                {/* Stock Visualizer */}
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 mb-6">
                    <div className="flex justify-between items-end mb-2">
                        <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-1">
                            <FaBoxOpen /> Availability
                        </span>
                        <span className={`text-xs font-black ${isLowStock ? 'text-rose-500' : 'text-slate-700'}`}>
                            {availableQuantity} <span className="text-slate-400 font-medium">/ {productQuantity}</span>
                        </span>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div 
                            className={`h-full rounded-full transition-all duration-500 ${isLowStock ? 'bg-rose-400' : 'bg-emerald-400'}`} 
                            style={{ width: `${stockPercent}%` }}
                        ></div>
                    </div>
                </div>

                {/* Footer Meta */}
                <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-400">
                        <FaCalendarAlt size={12} />
                        <span className="text-[10px] font-bold uppercase tracking-wide">
                            {new Date(dateAdded).toLocaleDateString()}
                        </span>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                        <button 
                            onClick={() => onUpdate(asset)}
                            className="btn btn-sm btn-square rounded-xl bg-slate-50 text-slate-400 hover:bg-primary hover:text-white border-none shadow-sm transition-all"
                            title="Edit Asset"
                        >
                            <FaEdit size={14} />
                        </button>
                        <button 
                            onClick={() => onDelete(_id)}
                            className="btn btn-sm btn-square rounded-xl bg-slate-50 text-slate-400 hover:bg-rose-500 hover:text-white border-none shadow-sm transition-all"
                            title="Delete Asset"
                        >
                            <FaTrashAlt size={14} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AssetCard;