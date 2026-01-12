import React from 'react';
import { FaBuilding, FaUserTie, FaBoxOpen, FaInfoCircle } from 'react-icons/fa';

const RequestAssetCard = ({ asset, onRequest }) => {
    const { _id, productName, productImage, productType, availableQuantity, hrEmail, companyName, productQuantity } = asset;
    const isOutOfStock = availableQuantity <= 0;
console.log(asset);
    return (
        <div className="group bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:border-primary/20 transition-all duration-500 overflow-hidden flex flex-col h-full">
            
            {/* --- IMAGE SECTION --- */}
            <figure className="relative h-56 p-6 bg-slate-50/50 overflow-hidden">
                <div className="absolute top-4 right-4 z-10">
                    <span className={`badge border-none font-black text-[10px] uppercase tracking-widest px-3 py-3 shadow-sm ${
                        productType === 'Returnable' 
                        ? 'bg-blue-100 text-blue-600' 
                        : 'bg-emerald-100 text-emerald-600'
                    }`}>
                        {productType}
                    </span>
                </div>
                
                <img 
                    src={productImage || "https://i.ibb.co/pL1p6w4/asset-placeholder.png"} 
                    alt={productName} 
                    className="h-full w-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" 
                />

                {/* Status Overlay for Out of Stock */}
                {isOutOfStock && (
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] flex items-center justify-center">
                        <span className="bg-white text-slate-900 px-4 py-2 rounded-xl font-black uppercase tracking-tighter shadow-xl">
                            Out of Stock
                        </span>
                    </div>
                )}
            </figure>

            {/* --- CONTENT SECTION --- */}
            <div className="p-6 flex flex-col flex-grow">
                <div className="mb-4">
                    <h2 className="text-xl font-bold text-slate-800 leading-tight line-clamp-2 min-h-[3rem]" title={productName}>
                        {productName}
                    </h2>
                </div>
                
                {/* Availability Bar */}
                <div className="mb-6">
                    <div className="flex justify-between items-end mb-1.5">
                        <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-1">
                            <FaBoxOpen /> Stock Status
                        </span>
                        <span className={`text-xs font-bold ${!isOutOfStock ? 'text-emerald-600' : 'text-rose-500'}`}>
                            {!isOutOfStock ? `${availableQuantity} Units Left` : 'Restocking Soon'}
                        </span>
                    </div>
                    <progress 
                        className={`progress h-1.5 w-full ${!isOutOfStock ? 'progress-primary' : 'progress-error opacity-30'}`} 
                        value={availableQuantity} 
                        max={productQuantity}
                    ></progress>
                </div>

                {/* Company & HR Info Blocks */}
                <div className="space-y-3 mb-8">
                    <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                        <div className="p-2 bg-white rounded-lg text-primary shadow-sm"><FaBuilding size={12}/></div>
                        <div className="overflow-hidden">
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">Company</p>
                            <p className="text-sm font-bold text-slate-700 truncate">{companyName}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                        <div className="p-2 bg-white rounded-lg text-indigo-500 shadow-sm"><FaUserTie size={12}/></div>
                        <div className="overflow-hidden">
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">Reviewer</p>
                            <p className="text-sm font-bold text-slate-700 truncate">{hrEmail}</p>
                        </div>
                    </div>
                </div>

                {/* --- ACTION BUTTON --- */}
                <div className="mt-auto">
                    <button 
                        className={`btn w-full rounded-2xl gap-2 font-black uppercase tracking-widest shadow-lg transition-all duration-300 ${
                            isOutOfStock 
                            ? 'btn-disabled bg-slate-100 text-slate-300' 
                            : 'btn-primary text-white shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1'
                        }`}
                        disabled={isOutOfStock}
                        onClick={() => onRequest(asset._id)} // Passing full object is better for the request modal
                    >
                        {isOutOfStock ? 'Currently Unavailable' : 'Request Asset'}
                    </button>
                    <p className="text-[9px] text-center text-slate-400 mt-3 font-medium uppercase tracking-tighter">
                        <FaInfoCircle className="inline mr-1" /> Subject to HR Approval
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RequestAssetCard;