import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { FaPaperPlane, FaTimes, FaInfoCircle, FaBuilding, FaEnvelope } from 'react-icons/fa';

const RequestAssetModal = ({ asset, setAsset }) => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();

    useEffect(() => {
        if (asset) {
            document.getElementById('request_modal').showModal();
        }
    }, [asset]);

    const handleClose = () => {
        setAsset(null);
        reset();
        document.getElementById('request_modal').close();
    };

    const onSubmit = async (data) => {
        setLoading(true);

        const requestData = {
            assetId: asset._id,
            assetName: asset.productName,
            assetType: asset.productType,
            assetImage: asset.productImage,
            requesterName: user?.displayName,
            requesterEmail: user?.email,
            hrEmail: asset.hrEmail,
            companyName: asset.companyName,
            requestDate: new Date(),
            requestStatus: 'pending',
            note: data.note,
        };

        try {
            const res = await axiosSecure.post('/requests', requestData);

            if (res.data.insertedId) {
                Swal.fire({
                    title: 'Request Sent!',
                    text: 'Your request is pending HR approval.',
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false,
                    customClass: { popup: 'rounded-3xl' }
                });
                handleClose();
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: 'Request Failed',
                text: error.response?.data?.message || 'Something went wrong.',
                icon: 'error',
                confirmButtonColor: '#ef4444',
                customClass: { popup: 'rounded-3xl' }
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <dialog id="request_modal" className="modal modal-bottom sm:modal-middle backdrop-blur-sm">
            <div className="modal-box max-w-2xl p-0 overflow-hidden rounded-[2.5rem] bg-white shadow-2xl border border-slate-100">
                
                {/* --- TOP HEADER BAR --- */}
                <div className="bg-slate-50 px-8 py-6 flex justify-between items-center border-b border-slate-100">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-primary/10 text-primary rounded-xl">
                            <FaInfoCircle size={20} />
                        </div>
                        <div>
                            <h3 className="text-xl font-black text-slate-800 tracking-tight">Confirm Request</h3>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Asset ID: {asset?._id?.slice(-8)}</p>
                        </div>
                    </div>
                    <button onClick={handleClose} className="btn btn-ghost btn-circle btn-sm text-slate-400 hover:text-slate-600">
                        <FaTimes size={18} />
                    </button>
                </div>

                {/* --- MODAL BODY --- */}
                <form onSubmit={handleSubmit(onSubmit)} className="p-8">
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        {/* Image Column */}
                        <div className="bg-slate-50 rounded-3xl p-6 flex items-center justify-center border border-slate-100/50">
                            <img 
                                src={asset?.productImage} 
                                alt={asset?.productName} 
                                className="max-h-56 object-contain mix-blend-multiply drop-shadow-xl"
                            />
                        </div>

                        {/* Info Column */}
                        <div className="space-y-4">
                            <div className="pb-2 border-b border-slate-100">
                                <h2 className="text-2xl font-black text-slate-800 line-clamp-2">{asset?.productName}</h2>
                                <span className={`badge border-none font-bold text-[10px] uppercase mt-2 px-3 py-3 ${
                                    asset?.productType === 'Returnable' ? 'bg-blue-100 text-blue-600' : 'bg-emerald-100 text-emerald-600'
                                }`}>
                                    {asset?.productType} Asset
                                </span>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-slate-600">
                                    <FaBuilding className="text-slate-300" />
                                    <span className="text-sm font-semibold">{asset?.companyName}</span>
                                </div>
                                <div className="flex items-center gap-3 text-slate-600">
                                    <FaEnvelope className="text-slate-300" />
                                    <span className="text-sm font-semibold truncate">{asset?.hrEmail}</span>
                                </div>
                            </div>

                            <div className="bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100/50">
                                <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">Stock Status</p>
                                <p className="text-indigo-900 font-bold">{asset?.availableQuantity} Units Available</p>
                            </div>
                        </div>
                    </div>

                    {/* --- NOTE SECTION --- */}
                    <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
                            Additional Request Notes
                        </label>
                        <textarea
                            className="textarea w-full textarea-bordered h-28 rounded-2xl bg-slate-50 border-slate-200 focus:ring-4 focus:ring-primary/10 transition-all text-slate-700 placeholder:text-slate-300"
                            placeholder="Briefly explain why you need this asset..."
                            {...register("note")}
                        ></textarea>
                    </div>

                    {/* --- ACTIONS --- */}
                    <div className="flex gap-4 mt-8">
                        <button
                            type="button"
                            className="btn btn-ghost flex-1 rounded-2xl text-slate-400 font-bold uppercase tracking-widest hover:bg-slate-100"
                            onClick={handleClose}
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary flex-[2] rounded-2xl gap-3 font-black uppercase tracking-widest shadow-xl shadow-primary/20"
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="loading loading-spinner"></span>
                            ) : (
                                <><FaPaperPlane /> Send Request</>
                            )}
                        </button>
                    </div>
                </form>
            </div>

            {/* Backdrop click to close */}
            <form method="dialog" className="modal-backdrop">
                <button onClick={handleClose}>close</button>
            </form>
        </dialog>
    );
};

export default RequestAssetModal;