import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import { FaBox, FaCloudUploadAlt, FaCamera, FaTag, FaLayerGroup, FaArrowRight } from 'react-icons/fa';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const image_hosting_key = import.meta.env.VITE_IMAGE_BB_API_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddAsset = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);
    const axiosSecure = useAxiosSecure();

    // 1. Fetch HR Profile for Company Name
    const { data: hrUser } = useQuery({
        queryKey: ['hr-profile', user?.email],
        enabled: !!user?.email, 
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`);
            return res.data;
        }
    });

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    // 2. Image Preview Handler
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const onSubmit = async (data) => {
        setLoading(true);
        const imageFile = { image: data.image[0] };

        try {
            // Upload to ImgBB
            const res = await axios.post(image_hosting_api, imageFile, {
                headers: { 'content-type': 'multipart/form-data' }
            });

            if (res.data.success) {
                const assetData = {
                    productName: data.productName,
                    productImage: res.data.data.display_url,
                    productType: data.productType,
                    productQuantity: parseInt(data.productQuantity),
                    availableQuantity: parseInt(data.productQuantity),
                    hrEmail: user?.email,
                    companyName: hrUser.companyName,
                    dateAdded: new Date(),
                };

                const serverRes = await axiosSecure.post('/assets', assetData);

                if (serverRes.data.insertedId) {
                    reset();
                    setPreviewImage(null);
                    Swal.fire({
                        title: 'Asset Added!',
                        text: `${assetData.productName} is now in your inventory.`,
                        icon: 'success',
                        timer: 2000,
                        showConfirmButton: false,
                        customClass: { popup: 'rounded-3xl' }
                    });
                }
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: 'Error',
                text: 'Failed to add asset. Please try again.',
                icon: 'error',
                customClass: { popup: 'rounded-3xl' }
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen py-8 px-4 animate-in fade-in duration-700">
            <title>Add New Asset | AssetVerse</title>
            
            <div className="max-w-5xl mx-auto bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-slate-100 overflow-hidden flex flex-col md:flex-row">
                
                {/* --- LEFT COLUMN: VISUAL UPLOADER --- */}
                <div className="w-full md:w-2/5 bg-slate-50/80 p-10 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-100 relative">
                    <h2 className="text-2xl font-black text-slate-800 tracking-tight mb-2">New Asset</h2>
                    <p className="text-sm text-slate-400 font-medium mb-8 text-center">Upload a clear photo to help employees identify this item.</p>
                    
                    <div className="relative group w-full aspect-square max-w-[320px] bg-white rounded-[2rem] border-4 border-dashed border-slate-200 flex items-center justify-center overflow-hidden shadow-sm hover:border-primary/50 transition-all duration-300">
                        {previewImage ? (
                            <img src={previewImage} alt="Preview" className="w-full h-full object-contain p-6 mix-blend-multiply" />
                        ) : (
                            <div className="text-center p-6">
                                <div className="bg-slate-50 p-6 rounded-full inline-block mb-4">
                                    <FaBox className="text-4xl text-slate-300" />
                                </div>
                                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">No Image Selected</p>
                            </div>
                        )}

                        {/* Overlay Input */}
                        <label className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/5 cursor-pointer flex flex-col items-center justify-center transition-all">
                            <div className="opacity-0 group-hover:opacity-100 bg-white/90 backdrop-blur-md px-6 py-3 rounded-2xl shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all flex items-center gap-3">
                                <FaCamera className="text-primary" />
                                <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">Upload Photo</span>
                            </div>
                            <input 
                                type="file" 
                                accept="image/*"
                                className="hidden" 
                                {...register("image", { required: true })}
                                onChange={(e) => {
                                    register("image").onChange(e); 
                                    handleImageChange(e);
                                }}
                            />
                        </label>
                    </div>
                    {errors.image && <p className="text-rose-500 text-xs font-bold mt-4 animate-pulse">Product image is required*</p>}
                </div>

                {/* --- RIGHT COLUMN: DATA ENTRY --- */}
                <div className="w-full md:w-3/5 p-10 md:p-14">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                        
                        <div className="space-y-6">
                            {/* Product Name */}
                            <div className="form-control">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3 ml-1 flex items-center gap-2">
                                    <FaTag /> Product Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g. MacBook Pro M3 Max"
                                    className="input input-bordered w-full h-14 rounded-2xl bg-slate-50 border-slate-200 focus:bg-white focus:ring-4 focus:ring-primary/10 transition-all font-bold text-slate-700 placeholder:text-slate-300"
                                    {...register("productName", { required: true })}
                                />
                                {errors.productName && <span className="text-rose-500 text-xs font-bold mt-2 ml-1">Name is required*</span>}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {/* Product Type */}
                                <div className="form-control">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3 ml-1 flex items-center gap-2">
                                        <FaLayerGroup /> Category
                                    </label>
                                    <select
                                        className="select select-bordered w-full h-14 rounded-2xl bg-slate-50 border-slate-200 focus:bg-white focus:ring-4 focus:ring-primary/10 font-bold text-slate-700"
                                        defaultValue=""
                                        {...register("productType", { required: true })}
                                    >
                                        <option value="" disabled>Select Type</option>
                                        <option value="Returnable">Returnable</option>
                                        <option value="Non-returnable">Non-returnable</option>
                                    </select>
                                    {errors.productType && <span className="text-rose-500 text-xs font-bold mt-2 ml-1">Type is required*</span>}
                                </div>

                                {/* Quantity */}
                                <div className="form-control">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3 ml-1 flex items-center gap-2">
                                        <FaBox /> Initial Stock
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="0"
                                        className="input input-bordered w-full h-14 rounded-2xl bg-slate-50 border-slate-200 focus:bg-white focus:ring-4 focus:ring-primary/10 font-bold text-slate-700"
                                        min="1"
                                        {...register("productQuantity", { required: true })}
                                    />
                                    {errors.productQuantity && <span className="text-rose-500 text-xs font-bold mt-2 ml-1">Quantity is required*</span>}
                                </div>
                            </div>
                        </div>

                        {/* --- ACTION BAR --- */}
                        <div className="pt-8 border-t border-slate-100 flex items-center justify-between">
                            <p className="text-xs font-medium text-slate-400">
                                This item will be immediately available <br/> for employees to request.
                            </p>
                            <button
                                type="submit"
                                className="btn btn-primary btn-lg rounded-2xl px-10 shadow-xl shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-1 transition-all gap-3 font-black uppercase tracking-widest text-xs h-14"
                                disabled={loading}
                            >
                                {loading ? (
                                    <span className="loading loading-spinner"></span>
                                ) : (
                                    <>Add to Inventory <FaArrowRight /></>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddAsset;