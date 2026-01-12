import React from 'react';
import RequestAssetRow from './RequestAssetRow';
import { FaListUl, FaLayerGroup, FaHistory } from 'react-icons/fa';

const RequestTableContainer = ({ assets, onRequest }) => {
    return (
        <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl overflow-hidden">
                
                {/* --- HEADER BAR --- */}
                <div className="hidden md:flex items-center gap-6 px-8 py-5 bg-slate-50/80 border-b border-slate-100">
                    {/* SL Index */}
                    <div className="hidden lg:block w-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">
                        #
                    </div>

                    {/* Image Placeholder Space */}
                    <div className="w-16 text-[10px] font-black uppercase text-slate-400 tracking-widest">
                        Preview
                    </div>

                    {/* Asset Details */}
                    <div className="flex-1 text-[10px] font-black uppercase text-slate-400 tracking-widest">
                        Asset Information
                    </div>

                    {/* Context (HR & Company) */}
                    <div className="hidden lg:flex flex-[1.5] text-[10px] font-black uppercase text-slate-400 tracking-widest">
                        Affiliation & Reviewer
                    </div>

                    {/* Action Space */}
                    <div className="w-32 text-right text-[10px] font-black uppercase text-slate-400 tracking-widest pr-4">
                        Request
                    </div>
                </div>

                {/* --- EMPTY STATE --- */}
                {assets.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 text-slate-300">
                        <FaLayerGroup size={48} className="mb-4 opacity-20" />
                        <p className="font-bold text-lg">No assets match your search</p>
                        <p className="text-sm">Try adjusting your filters or search query.</p>
                    </div>
                ) : (
                    /* --- DATA ROWS --- */
                    <ul className="flex flex-col w-full divide-y divide-slate-50">
                        {assets.map((asset, index) => (
                            <RequestAssetRow
                                key={asset._id}
                                asset={asset}
                                index={index}
                                onRequest={onRequest}
                            />
                        ))}
                    </ul>
                )}
            </div>

            {/* --- FOOTER INFO --- */}
            <div className="mt-4 px-6 flex items-center justify-between text-slate-400">
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-tighter">
                    <FaListUl /> {assets.length} items found
                </div>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-tighter">
                    <FaHistory /> Real-time Inventory
                </div>
            </div>
        </div>
    );
};

export default RequestTableContainer;