import React from 'react';
import AssetRow from '../AssetComponents/AssetRow';
import { FaBoxOpen, FaLayerGroup, FaSortAmountDown } from 'react-icons/fa';

const TableContainer = ({ assets, onDelete, onUpdate }) => {

    return (
        <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl overflow-hidden">

                {/* --- HEADER BAR --- */}
                {/* Hidden on mobile because the Row transforms into a card layout */}
                <div className="hidden md:flex items-center gap-6 px-5 py-5 bg-slate-50/80 border-b border-slate-100">
                    
                    {/* Index */}
                    <div className="hidden lg:block w-8 text-[10px] font-black uppercase text-slate-400 tracking-widest text-center">
                        #
                    </div>

                    {/* Asset Name + Image Block */}
                    <div className="flex-1 md:flex-[1.5] text-[10px] font-black uppercase text-slate-400 tracking-widest pl-2">
                        Asset Details
                    </div>

                    {/* Stock Status Bar */}
                    <div className="w-48 text-[10px] font-black uppercase text-slate-400 tracking-widest">
                        Inventory Status
                    </div>

                    {/* Date Added */}
                    <div className="hidden lg:block w-32 pl-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">
                        Date Added
                    </div>

                    {/* Action Buttons */}
                    <div className="w-20 text-right text-[10px] font-black uppercase text-slate-400 tracking-widest pr-4">
                        Manage
                    </div>
                </div>

                {/* --- EMPTY STATE --- */}
                {(!assets || assets.length === 0) ? (
                    <div className="flex flex-col items-center justify-center py-24 text-slate-300">
                        <div className="bg-slate-50 p-6 rounded-full mb-4">
                            <FaBoxOpen size={32} className="text-slate-300" />
                        </div>
                        <p className="font-bold text-lg text-slate-500">Your inventory is empty</p>
                        <p className="text-sm font-medium text-slate-400">Add some assets to see them listed here.</p>
                    </div>
                ) : (
                    /* --- DATA ROWS --- */
                    <ul className="flex flex-col w-full divide-y divide-slate-50">
                        {assets.map((asset, index) => (
                            <AssetRow
                                key={asset._id}
                                asset={asset}
                                index={index}
                                onDelete={onDelete}
                                onUpdate={onUpdate}
                            />
                        ))}
                    </ul>
                )}
            </div>

            {/* --- FOOTER META INFO --- */}
            {assets && assets.length > 0 && (
                <div className="mt-4 px-6 flex items-center justify-between text-slate-400">
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-tighter">
                        <FaLayerGroup /> Showing {assets.length} Items
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-tighter">
                        <FaSortAmountDown /> Recent First
                    </div>
                </div>
            )}
        </div>
    );
};

export default TableContainer;