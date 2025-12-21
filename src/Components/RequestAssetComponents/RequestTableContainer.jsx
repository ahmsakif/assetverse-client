import React from 'react';
import RequestAssetRow from './RequestAssetRow';

const RequestTableContainer = ({ assets, onRequest }) => {

    // if (!assets || assets.length === 0) return <div className="text-center text-2xl p-10 opacity-50">No assets found.</div>;
    console.log(assets);

    return (
        <div>
            <div>
                <ul className="flex flex-col bg-base-100 rounded-box shadow-md border border-base-200 w-full">

                    <li className="flex items-center gap-4 p-4 bg-base-200 text-xs uppercase font-bold tracking-wide opacity-70 border-b border-base-300">
                        <div className="w-8">Sl</div>
                        <div className="w-14">Image</div>
                        <div className="flex-1">Asset Name</div>
                        <div className="flex-1">HR & Company</div>
                        <div className="w-28 text-center">Type</div>
                        <div className="w-16 text-center">Qty</div>
                        <div className="w-16 text-center">Available</div>
                        <div className="w-28 text-center pr-2">Actions</div>
                    </li>

                    {/* --- DATA ROWS --- */}
                    {assets.map((asset, index) => (
                        <RequestAssetRow
                            key={asset._id}
                            asset={asset}
                            index={index}
                            onRequest={onRequest}
                        />
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default RequestTableContainer;