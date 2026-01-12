import React from 'react';
import { FaEdit, FaTrashAlt, FaBox, FaCalendarAlt } from 'react-icons/fa';

const AssetRow = ({ asset, index, onDelete, onUpdate }) => {
    const { _id, productName, productImage, productType, productQuantity, dateAdded, availableQuantity } = asset;
    
    // Calculate stock percentage for visual bar
    const stockPercent = Math.min((availableQuantity / productQuantity) * 100, 100);
    const isLowStock = availableQuantity < 5;

    return (
        <li className="group flex flex-col md:flex-row items-center gap-4 md:gap-6 p-5 bg-white hover:bg-slate-50 transition-all duration-300 border-b border-slate-100 last:border-none first:rounded-t-[1.5rem] last:rounded-b-[1.5rem]">

            {/* --- INDEX (Desktop Only) --- */}
            <div className="hidden lg:flex w-8 items-center justify-center font-black text-slate-300 text-xs">
                {(index + 1).toString().padStart(2, '0')}
            </div>

            {/* --- IMAGE & NAME SECTION --- */}
            <div className="flex items-center gap-4 w-full md:w-auto md:flex-[1.5] min-w-0">
                <div className="relative flex-shrink-0">
                    <div className="size-14 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-sm group-hover:scale-105 transition-transform duration-300 flex items-center justify-center p-1">
                        <img
                            className="h-full w-full object-contain mix-blend-multiply"
                            src={productImage || "https://i.ibb.co/pL1p6w4/asset-placeholder.png"}
                            alt={productName}
                        />
                    </div>
                </div>

                <div className="flex-1 min-w-0">
                    <h4 className="font-black text-slate-800 text-base truncate group-hover:text-primary transition-colors" title={productName}>
                        {productName}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
                            #{_id.slice(-5)}
                        </span>
                        <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-md tracking-tighter ${
                            productType === 'Returnable' ? 'bg-indigo-50 text-indigo-500' : 'bg-emerald-50 text-emerald-500'
                        }`}>
                            {productType}
                        </span>
                    </div>
                </div>
            </div>

            {/* --- STOCK STATS (Visual Bar) --- */}
            <div className="w-full md:w-48 flex flex-col gap-1 border-t md:border-t-0 md:border-l border-slate-100 pt-3 md:pt-0 md:pl-6">
                <div className="flex justify-between items-end text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    <span>Availability</span>
                    <span className={isLowStock ? "text-rose-500" : "text-emerald-500"}>
                        {availableQuantity} / {productQuantity}
                    </span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                        className={`h-full rounded-full ${isLowStock ? 'bg-rose-400' : 'bg-emerald-400'}`} 
                        style={{ width: `${stockPercent}%` }}
                    ></div>
                </div>
            </div>

            {/* --- DATE ADDED --- */}
            <div className="hidden lg:flex flex-col w-32 pl-6 border-l border-slate-100 text-slate-500">
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                    <FaCalendarAlt /> Added
                </div>
                <span className="text-xs font-bold text-slate-600 mt-0.5">
                    {new Date(dateAdded).toLocaleDateString()}
                </span>
            </div>

            {/* --- ACTIONS --- */}
            <div className="w-full md:w-auto flex items-center justify-end gap-3 md:pl-6 md:border-l border-slate-100 mt-2 md:mt-0">
                <button
                    onClick={() => onUpdate(asset)}
                    className="btn btn-sm btn-square rounded-xl bg-slate-50 text-slate-400 hover:bg-primary hover:text-white border-none shadow-sm transition-all"
                    title="Edit Asset"
                >
                    <FaEdit />
                </button>
                <button
                    onClick={() => onDelete(_id)}
                    className="btn btn-sm btn-square rounded-xl bg-slate-50 text-slate-400 hover:bg-rose-500 hover:text-white border-none shadow-sm transition-all"
                    title="Delete Asset"
                >
                    <FaTrashAlt />
                </button>
            </div>
        </li>
    );
};

export default AssetRow;