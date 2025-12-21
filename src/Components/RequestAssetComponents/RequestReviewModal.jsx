import React from 'react';

const RequestReviewModal = ({ selectedRequest, setSelectedRequest, handleApprove, handleReject }) => {
    return (
        <dialog id="review_modal" className="modal modal-open modal-bottom sm:modal-middle">
            <div className="modal-box">
                <h3 className="font-bold text-lg mb-4 text-center border-b pb-2">
                    Review Asset Request
                </h3>

                <div className="space-y-3">
                    {/* Asset Details */}
                    <div className="flex items-center gap-4 bg-base-200 p-3 rounded-lg">
                        <div>
                            <p className="font-bold text-lg">{selectedRequest?.assetName}</p>
                            <div className="badge badge-ghost badge-sm">{selectedRequest?.assetType}</div>
                        </div>
                    </div>

                    {/* Requester Details */}
                    <div className="grid grid-cols-2 gap-2 text-sm mt-4">
                        <div className="text-gray-500">Requester Name:</div>
                        <div className="font-semibold">{selectedRequest?.requesterName}</div>

                        <div className="text-gray-500">Requester Email:</div>
                        <div className="font-semibold">{selectedRequest?.requesterEmail}</div>

                        <div className="text-gray-500">Request Date:</div>
                        <div>{new Date(selectedRequest?.requestDate).toLocaleDateString()}</div>
                    </div>

                    {/* Note Section */}
                    <div className="mt-4">
                        <span className="label-text font-bold">Additional Note:</span>
                        <div className="p-3 bg-base-100 border border-base-300 rounded-md mt-1 text-sm text-gray-600 h-24 overflow-y-auto">
                            {selectedRequest?.note || "No additional notes provided."}
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="modal-action justify-between mt-6">
                    <button
                        className="btn btn-ghost"
                        onClick={() => setSelectedRequest(null)}
                    >
                        Cancel
                    </button>

                    <div className="flex gap-2">
                        <button
                            onClick={() => {
                                handleReject(selectedRequest?._id);
                                setSelectedRequest(null); // Close modal
                            }}
                            className="btn btn-error text-white"
                        >
                            Reject
                        </button>
                        <button
                            onClick={() => {
                                handleApprove(selectedRequest);
                                setSelectedRequest(null); // Close modal
                            }}
                            className="btn btn-success text-white"
                        >
                            Approve
                        </button>
                    </div>
                </div>
            </div>
            {/* Backdrop click to close */}
            <form method="dialog" className="modal-backdrop">
                <button onClick={() => setSelectedRequest(null)}>close</button>
            </form>
        </dialog>
    );
};

export default RequestReviewModal;