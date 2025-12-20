import React from 'react';
import AssetRow from './AssetRow';


const AssetTable = ({ assets, onDelete }) => {
    if (!assets || assets.length === 0) return <div className="text-center p-10">No assets found.</div>;

    return (
        <div className="overflow-x-auto bg-base-100 rounded-lg shadow border border-base-200">
            <table className="table w-full">
                {/* Table Header */}
                <thead className="bg-base-200 text-base-content uppercase text-xs">
                    <tr>
                        <th>Asset</th>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Quantity</th>
                        <th>Date Added</th>
                        <th>Action</th>
                    </tr>
                </thead>
                {/* Table Body */}
                <tbody>
                    {assets.map((asset) => (
                        <AssetRow 
                            key={asset._id} 
                            asset={asset} 
                            onDelete={onDelete} 
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AssetTable;