import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FaBox, FaCloudUploadAlt, FaExchangeAlt, FaTimes, FaCamera } from 'react-icons/fa';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const image_hosting_key = import.meta.env.VITE_IMAGE_BB_API_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateAssetModal = ({ asset, refetch, setEditingAsset }) => {
    const [loading, setLoading] = useState(false);
    const [addStockMode, setAddStockMode] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);
    const axiosSecure = useAxiosSecure();

    const {
        register,
        handleSubmit,
        reset,
        watch,
        setValue,
        formState: { errors }
    } = useForm();

    // Initialize Form Data
    useEffect(() => {
        if (asset) {
            reset({
                productName: asset.productName,
                productType: asset.productType,
                productQuantity: asset.productQuantity,
                addedQuantity: 0
            });
            setPreviewImage(asset.productImage);
            setAddStockMode(false);
            document.getElementById('update_modal').showModal();
        }
    }, [asset, reset]);

    const handleClose = () => {
        setEditingAsset(null);
        document.getElementById('update_modal').close();
    };

    // Live Math Logic
    const addedQty = watch("addedQuantity") || 0;
    const existingQty = asset?.productQuantity || 0;
    const newTotal = parseInt(existingQty) + parseInt(addedQty);

    // Image Preview Handler
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const onSubmit = async (data) => {
        setLoading(true);
        let finalImageUrl = asset.productImage;

        try {
            // 1. Image Upload (Only if changed)
            if (data.image && data.image[0]) {
                const imageFile = { image: data.image[0] };
                const res = await axios.post(image_hosting_api, imageFile, {
                    headers: { 'content-type': 'multipart/form-data' }
                });

                if (res.data.success) {
                    finalImageUrl = res.data.data.display_url;
                }
            }

            // 2. Quantity Logic
            let finalQuantity;
            if (addStockMode) {
                finalQuantity = newTotal;
            } else {
                finalQuantity = parseInt(data.productQuantity);
            }

            // 3. API Payload
            const updatedData = {
                productName: data.productName,
                productType: data.productType,
                productQuantity: finalQuantity,
                productImage: finalImageUrl,
            };

            const serverRes = await axiosSecure.patch(`/assets/${asset._id}`, updatedData);

            if (serverRes.data.modifiedCount > 0) {
                refetch();
                handleClose();
                Swal.fire({
                    title: 'Success',
                    text: 'Inventory updated successfully.',
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false,
                    customClass: { popup: 'rounded-3xl' }
                });
            } else {
                handleClose();
                Swal.fire({ title: 'Info', text: 'No changes detected.', icon: 'info', customClass: { popup: 'rounded-3xl' } });
            }

        } catch (error) {
            console.error(error);
            handleClose();
            Swal.fire({ title: 'Error', text: 'Update failed.', icon: 'error', customClass: { popup: 'rounded-3xl' } });
        } finally {
            setLoading(false);
        }
    };

    return (
        <dialog id="update_modal" className="modal modal-bottom sm:modal-middle backdrop-blur-sm">
            <div className="modal-box max-w-4xl p-0 bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden">
                
                {/* --- HEADER --- */}
                <div className="bg-slate-50 px-8 py-5 flex justify-between items-center border-b border-slate-100">
                    <div>
                        <h3 className="text-xl font-black text-slate-800 tracking-tight">Edit Inventory</h3>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">ID: {asset?._id?.slice(-6)}</p>
                    </div>
                    <button onClick={handleClose} className="btn btn-ghost btn-circle btn-sm text-slate-400 hover:text-slate-600 hover:bg-slate-200">
                        <FaTimes size={18} />
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col md:flex-row">
                    
                    {/* --- LEFT COLUMN: IMAGE UPLOAD --- */}
                    <div className="w-full md:w-2/5 bg-slate-50/50 p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-100 relative">
                        <div className="relative group w-full aspect-square max-w-[250px] bg-white rounded-3xl border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden shadow-sm hover:border-primary/50 transition-colors">
                            
                            {previewImage ? (
                                <img src={previewImage} alt="Preview" className="w-full h-full object-contain p-4 mix-blend-multiply" />
                            ) : (
                                <div className="text-center p-6">
                                    <FaBox className="mx-auto text-4xl text-slate-200 mb-2" />
                                    <span className="text-xs text-slate-400 font-bold uppercase">No Image</span>
                                </div>
                            )}

                            {/* Overlay Input */}
                            <label className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 cursor-pointer flex flex-col items-center justify-center transition-all">
                                <div className="opacity-0 group-hover:opacity-100 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all flex items-center gap-2">
                                    <FaCamera className="text-slate-700" />
                                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">Change</span>
                                </div>
                                <input 
                                    type="file" 
                                    accept="image/*"
                                    className="hidden" 
                                    {...register("image")}
                                    onChange={(e) => {
                                        register("image").onChange(e); // Maintain hook form registration
                                        handleImageChange(e);
                                    }}
                                />
                            </label>
                        </div>
                        <p className="mt-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">
                            Click image to upload new photo
                        </p>
                    </div>

                    {/* --- RIGHT COLUMN: FORM DATA --- */}
                    <div className="w-full md:w-3/5 p-8 space-y-6">
                        
                        {/* Name Field */}
                        <div className="form-control">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Asset Name</label>
                            <input
                                type="text"
                                className="input input-bordered w-full rounded-2xl bg-white focus:ring-4 focus:ring-primary/10 border-slate-200 font-bold text-slate-700"
                                {...register("productName", { required: true })}
                            />
                        </div>

                        {/* Type Field */}
                        <div className="form-control">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Asset Category</label>
                            <select
                                className="select select-bordered w-full rounded-2xl bg-white focus:ring-4 focus:ring-primary/10 border-slate-200 font-bold text-slate-700"
                                {...register("productType", { required: true })}
                            >
                                <option value="Returnable">Returnable</option>
                                <option value="Non-returnable">Non-returnable</option>
                            </select>
                        </div>

                        {/* --- SMART QUANTITY LOGIC --- */}
                        <div className="bg-indigo-50/50 p-5 rounded-3xl border border-indigo-100/50 relative overflow-hidden">
                            {/* Toggle Header */}
                            <div className="flex justify-between items-center mb-4">
                                <span className="flex items-center gap-2 text-xs font-black text-indigo-400 uppercase tracking-widest">
                                    <FaExchangeAlt /> Stock Management
                                </span>
                                <div className="flex bg-white rounded-lg p-1 shadow-sm">
                                    <button
                                        type="button"
                                        onClick={() => setAddStockMode(false)}
                                        className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase transition-all ${!addStockMode ? 'bg-indigo-500 text-white shadow-md' : 'text-slate-400 hover:bg-slate-50'}`}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setAddStockMode(true)}
                                        className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase transition-all ${addStockMode ? 'bg-indigo-500 text-white shadow-md' : 'text-slate-400 hover:bg-slate-50'}`}
                                    >
                                        Add
                                    </button>
                                </div>
                            </div>

                            {addStockMode ? (
                                // "ADD STOCK" MODE (Visual Math)
                                <div className="flex items-end gap-3">
                                    <div className="flex-1">
                                        <p className="text-[10px] font-bold text-slate-400 mb-1 pl-1">Current</p>
                                        <div className="input input-bordered flex items-center justify-center bg-white/50 text-slate-500 font-bold rounded-xl border-dashed">
                                            {existingQty}
                                        </div>
                                    </div>
                                    <div className="pb-3 text-slate-400 font-black">+</div>
                                    <div className="flex-1">
                                        <p className="text-[10px] font-bold text-slate-400 mb-1 pl-1">Add</p>
                                        <input
                                            type="number"
                                            className="input input-bordered w-full rounded-xl bg-white text-center font-bold text-slate-800 focus:border-indigo-500"
                                            placeholder="0"
                                            min="0"
                                            {...register("addedQuantity")} 
                                        />
                                    </div>
                                    <div className="pb-3 text-slate-400 font-black">=</div>
                                    <div className="flex-1">
                                        <p className="text-[10px] font-bold text-indigo-400 mb-1 pl-1">New Total</p>
                                        <div className="input flex items-center justify-center bg-indigo-500 text-white font-black rounded-xl shadow-lg shadow-indigo-200">
                                            {newTotal}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                // "EDIT TOTAL" MODE
                                <div>
                                    <label className="text-[10px] font-bold text-slate-400 mb-1 pl-1 block">Set Total Quantity</label>
                                    <input
                                        type="number"
                                        className="input input-bordered w-full rounded-xl bg-white font-bold text-slate-800"
                                        min="0"
                                        {...register("productQuantity", { required: !addStockMode })}
                                    />
                                </div>
                            )}
                        </div>

                        {/* --- ACTIONS --- */}
                        <div className="flex gap-4 pt-4">
                            <button
                                type="button"
                                className="btn btn-ghost flex-1 rounded-2xl text-slate-400 font-bold uppercase tracking-widest hover:bg-slate-100"
                                onClick={handleClose}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="btn btn-primary flex-[2] rounded-2xl gap-2 font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all"
                                disabled={loading}
                            >
                                {loading ? <span className="loading loading-spinner"></span> : <><FaCloudUploadAlt size={18} /> Update Asset</>}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            
            {/* Click Outside to Close */}
            <form method="dialog" className="modal-backdrop">
                <button onClick={handleClose}>close</button>
            </form>
        </dialog>
    );
};

export default UpdateAssetModal;