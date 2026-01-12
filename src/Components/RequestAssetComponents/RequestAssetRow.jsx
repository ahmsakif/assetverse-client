import React from 'react';
import { FaBuilding, FaUserTie, FaArrowRight, FaLock, FaInfoCircle } from 'react-icons/fa';

const RequestAssetRow = ({ asset, index, onRequest }) => {
    const { _id, productName, productImage, productType, availableQuantity, hrEmail, companyName } = asset;
    const isOutOfStock = availableQuantity <= 0;

    return (
        <li className="group relative flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 p-5 bg-white hover:bg-slate-50 transition-all duration-300 border-b border-slate-100 last:border-none first:rounded-t-[2rem] last:rounded-b-[2rem]">
            
            {/* --- INDEX (Desktop Only) --- */}
            <div className="hidden lg:flex w-6 items-center justify-center font-black text-slate-300 text-xs">
                {(index + 1).toString().padStart(2, '0')}
            </div>

            {/* --- IMAGE & NAME SECTION (Primary Focus) --- */}
            <div className="flex items-center gap-4 w-full md:w-auto md:flex-1 min-w-0">
                <div className="relative flex-shrink-0">
                    <div className={`size-14 md:size-16 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-sm group-hover:scale-105 transition-transform duration-300 flex items-center justify-center p-2 ${isOutOfStock ? 'grayscale opacity-50' : ''}`}>
                        <img
                            className="max-h-full max-w-full object-contain mix-blend-multiply"
                            src={productImage || "https://i.ibb.co/pL1p6w4/asset-placeholder.png"}
                            alt={productName}
                        />
                    </div>
                    {isOutOfStock && (
                        <div className="absolute -top-1 -right-1 bg-rose-500 text-white rounded-full p-1.5 shadow-lg border-2 border-white">
                            <FaLock size={10} />
                        </div>
                    )}
                </div>

                <div className="flex-1 min-w-0">
                    <h4 className="font-black text-slate-800 text-base md:text-lg truncate group-hover:text-primary transition-colors" title={productName}>
                        {productName}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                        <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-md tracking-tighter ${
                            productType === 'Returnable' ? 'bg-blue-50 text-blue-500' : 'bg-emerald-50 text-emerald-500'
                        }`}>
                            {productType}
                        </span>
                        <span className="text-[10px] text-slate-400 font-bold hidden sm:inline">ID: {_id.slice(-6)}</span>
                    </div>
                </div>
            </div>

            {/* --- CONTEXT DATA (Hidden on Mobile, Visible on Tablet/Desktop) --- */}
            <div className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4 w-full md:w-auto md:flex-[1.5] border-t md:border-t-0 border-slate-50 pt-4 md:pt-0">
                <div className="flex flex-col">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1 mb-0.5">
                        <FaBuilding className="text-primary/40" /> Company
                    </p>
                    <p className="text-sm font-bold text-slate-700 truncate">{companyName}</p>
                </div>
                <div className="flex flex-col">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1 mb-0.5">
                        <FaUserTie className="text-indigo-400/40" /> Reviewer
                    </p>
                    <p className="text-sm font-bold text-slate-600 truncate italic">{hrEmail}</p>
                </div>
            </div>

            {/* --- ACTION SECTION --- */}
            <div className="w-full md:w-auto flex items-center justify-between md:justify-end gap-4 border-t md:border-t-0 border-slate-50 pt-4 md:pt-0 md:pl-6 md:border-l">
                {/* Mobile-only stock indicator */}
                <div className="md:hidden">
                   <span className={`text-[10px] font-black uppercase tracking-widest ${isOutOfStock ? 'text-rose-400' : 'text-emerald-500'}`}>
                        {isOutOfStock ? 'Sold Out' : 'Available'}
                   </span>
                </div>

                <button
                    disabled={isOutOfStock}
                    onClick={() => onRequest(asset)}
                    className={`btn btn-md md:btn-sm lg:btn-md rounded-2xl gap-3 px-6 md:px-8 transition-all duration-300 font-black uppercase tracking-widest text-[11px] h-12 md:h-10 lg:h-12
                        ${isOutOfStock 
                            ? 'btn-disabled bg-slate-100 text-slate-300 border-none' 
                            : 'btn-primary text-white shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5'
                        }`}
                >
                    {isOutOfStock ? 'Unavailable' : <>Request <FaArrowRight className="hidden sm:inline" /></>}
                </button>
            </div>
        </li>
    );
};

export default RequestAssetRow;