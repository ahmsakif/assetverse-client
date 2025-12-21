import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Swal from 'sweetalert2';
import useAxios from '../../Hooks/useAxios';


const image_hosting_key = import.meta.env.VITE_IMAGE_BB_API_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateAssetModal = ({ asset, refetch, setEditingAsset }) => {
    const [loading, setLoading] = useState(false);
    const [addStockMode, setAddStockMode] = useState(false)
    const axiosInstance = useAxios();

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors }
    } = useForm();

    // useEffect(() => {
    //     if (asset) {
    //         setAddStockMode(false)
    //         document.getElementById('update_modal').showModal();
    //     }
    // }, [asset]);
    // Pre-fill form when 'asset' prop changes
    useEffect(() => {
        if (asset) {
            reset({
                productName: asset.productName,
                productType: asset.productType,
                productQuantity: asset.productQuantity,
                addedQuantity: 0
            });
            setAddStockMode(false)
            document.getElementById('update_modal').showModal();
        }
    }, [asset, reset]);

    const handleClose = () => {
        setEditingAsset(null);
        document.getElementById('update_modal').close();
    };

    const addedQty = watch("addedQuantity")
    const existingQty = asset?.productQuantity || 0

    const onSubmit = async (data) => {
        setLoading(true);
        let finalImageUrl = asset.productImage;

        try {
            // Check if a NEW image was selected
            if (data.image && data.image[0]) {
                const imageFile = { image: data.image[0] };
                const res = await axios.post(image_hosting_api, imageFile, {
                    headers: { 'content-type': 'multipart/form-data' }
                });

                if (res.data.success) {
                    finalImageUrl = res.data.data.display_url;
                }
            }

            let finalQuantity;

            if (addStockMode) {
                finalQuantity = parseInt(existingQty) + parseInt(data.addedQuantity || 0);
            } else {
                finalQuantity = parseInt(data.productQuantity);
            }

            // Prepare Data for Update
            const updatedData = {
                productName: data.productName,
                productType: data.productType,
                productQuantity: finalQuantity,
                productImage: finalImageUrl,
            };

            // Send PATCH Request
            const serverRes = await axiosInstance.patch(`/assets/${asset._id}`, updatedData);

            if (serverRes.data.modifiedCount > 0) {
                refetch();
                handleClose();
                Swal.fire({
                    title: 'Updated!',
                    text: 'Asset information has been updated successfully.',
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false
                });
            } else {
                // Handle case where no changes were made but request was successful
                handleClose();
                Swal.fire('Info', 'No changes were made.', 'info');
            }

        } catch (error) {
            console.error(error);
            handleClose()
            Swal.fire({
                title: 'Error!',
                text: 'Failed to update the asset.',
                icon: 'error',
                confirmButtonText: 'Try Again'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <dialog id="update_modal" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box bg-base-100">
                <h3 className="font-bold text-2xl text-center text-primary mb-6">Update Asset</h3>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    
                    {/* Product Name */}
                    <div className="form-control">
                        <label className="label"><span className="label-text font-semibold">Product Name</span></label>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            {...register("productName", { required: true })}
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        {/* Type */}
                        <div className="form-control w-full sm:w-1/2">
                            <label className="label"><span className="label-text font-semibold">Type</span></label>
                            <select
                                className="select select-bordered w-full"
                                {...register("productType", { required: true })}
                            >
                                <option value="Returnable">Returnable</option>
                                <option value="Non-returnable">Non-returnable</option>
                            </select>
                        </div>

                        {/* --- QUANTITY SECTION WITH TOGGLE --- */}
                        <div className="form-control w-full sm:w-1/2">
                            <label className="label cursor-pointer justify-start gap-2">
                                <span className="label-text font-semibold">Quantity</span>
                                {/* Toggle Switch */}
                                <input 
                                    type="checkbox" 
                                    className="toggle toggle-xs toggle-primary" 
                                    checked={addStockMode}
                                    onChange={() => setAddStockMode(!addStockMode)}
                                />
                                <span className="label-text-alt text-primary font-bold">
                                    {addStockMode ? 'Add Stock' : 'Edit Total'}
                                </span>
                            </label>

                            {addStockMode ? (
                                // OPTION A: Add More Input
                                <div>
                                    <div className="join w-full">
                                        <div className="btn join-item no-animation bg-base-200 text-gray-500">
                                            {existingQty} +
                                        </div>
                                        <input
                                            type="number"
                                            placeholder="Add"
                                            className="input input-bordered join-item w-full"
                                            min="1"
                                            {...register("addedQuantity")} 
                                        />
                                    </div>
                                    <div className="label">
                                        <span className="label-text-alt">
                                            New Total: <span className="font-bold text-success">{parseInt(existingQty) + parseInt(addedQty || 0)}</span>
                                        </span>
                                    </div>
                                </div>
                            ) : (
                                // OPTION B: Standard Edit Input
                                <input
                                    type="number"
                                    className="input input-bordered w-full"
                                    min="0"
                                    {...register("productQuantity", { required: !addStockMode })}
                                />
                            )}
                        </div>
                    </div>

                    {/* Image Upload */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Change Image (Optional)</span>
                        </label>
                        <input
                            type="file"
                            className="file-input file-input-bordered w-full"
                            {...register("image")} 
                        />
                        <div className="label">
                            <span className="label-text-alt text-gray-400">Leave empty to keep current image</span>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="modal-action flex justify-between mt-6">
                        <button type="button" className="btn btn-ghost" onClick={handleClose}>Cancel</button>
                        <button type="submit" className="btn btn-primary px-8" d v isabled={loading}>
                            {loading ? <span className="loading loading-spinner loading-xs"></span> : 'Update'}
                        </button>
                    </div>
                </form>
            </div>
            
            <form method="dialog" className="modal-backdrop">
                <button onClick={handleClose}>close</button>
            </form>
        </dialog>
    );
};

export default UpdateAssetModal;