import React, { useState } from 'react';
import useAuth from '../../Hooks/useAuth';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import useAxios from '../../Hooks/useAxios';
import Swal from 'sweetalert2';

const image_hosting_key = import.meta.env.VITE_IMAGE_BB_API_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;


const AddAsset = () => {

    const { user } = useAuth()
    // const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const axiosInstance = useAxios()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm()


    const onSubmit = async (data) => {
        setLoading(true)

        // Upload image 
        const imageFile = { image: data.image[0] }

        try {
            const res = await axios.post(image_hosting_api, imageFile, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })

            if (res.data.success) {

                const assetData = {
                    productName: data.productName,
                    productImage: res.data.data.display_url,
                    productType: data.productType,
                    productQuantity: parseInt(data.productQuantity),
                    // Initialize availableQuantity to be same as productQuantity
                    availableQuantity: parseInt(data.productQuantity),
                    hrEmail: user?.email,
                    dateAdded: new Date(),
                }

                const serverRes = await axiosInstance.post('/assets', assetData)
                console.log(serverRes.data);

                if (serverRes.data.insertedId) {
                    setLoading(false)
                    reset()
                    Swal.fire({
                        title: 'Asset Added Successfully!',
                        text: `${assetData.productName} added into company assets. Quantity: ${assetData.productQuantity}`,
                        icon: 'success',
                        confirmButtonText: 'Okay'
                    })
                }
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
            Swal.fire({
                title: 'Error!',
                text: 'Something went wrong.',
                icon: 'error',
                confirmButtonText: 'Try Again'
            });
        }

        // console.log(data);
    }
    return (
        <div className="max-w-2xl mx-auto bg-base-100 p-8 rounded-xl shadow-lg mt-10">
            <h2 className="text-3xl font-bold text-center mb-6 text-primary">Add New Asset</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                {/* Product Name */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-semibold">Product Name</span>
                    </label>
                    <input
                        type="text"
                        placeholder="e.g. Apple Macbook Pro 16"
                        className="input input-bordered w-full"
                        {...register("productName", { required: true })}
                    />
                    {errors.productName && <span className="text-red-500 text-sm mt-1">Product Name is required</span>}
                </div>

                {/* Product Type & Quantity Row */}
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Product Type */}
                    <div className="form-control w-full md:w-1/2">
                        <label className="label">
                            <span className="label-text font-semibold">Product Type</span>
                        </label>
                        <select
                            className="select select-bordered w-full"
                            defaultValue=""
                            {...register("productType", { required: true })}
                        >
                            <option value="" disabled>Select Type</option>
                            <option value="Returnable">Returnable</option>
                            <option value="Non-returnable">Non-returnable</option>
                        </select>
                        {errors.productType && <span className="text-red-500 text-sm mt-1">Product Type is required</span>}
                    </div>

                    {/* Product Quantity */}
                    <div className="form-control w-full md:w-1/2">
                        <label className="label">
                            <span className="label-text font-semibold">Product Quantity</span>
                        </label>
                        <input
                            type="number"
                            placeholder="e.g. 5"
                            className="input input-bordered w-full"
                            min="1"
                            {...register("productQuantity", { required: true })}
                        />
                        {errors.productQuantity && <span className="text-red-500 text-sm mt-1">Quantity is required</span>}
                    </div>
                </div>

                {/* Image Upload */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-semibold">Product Image</span>
                    </label>
                    <input
                        type="file"
                        className="file-input file-input-bordered w-full"
                        {...register("image", { required: true })}
                    />
                    {errors.image && <span className="text-red-500 text-sm mt-1">Image is required</span>}
                </div>

                {/* Submit Button */}
                <div className="form-control mt-6 flex justify-between">
                    <div></div>
                    <button
                        type="submit"
                        className={`btn flex items-center justify-center gap-4 btn-wide btn-primary text-white font-bold text-lg ${loading ? '' : ''}`}
                        disabled={loading}
                    >
                        <span>{loading ? 'Adding...' : 'Add Asset'}</span>
                        {
                            loading
                            ? <span className="loading loading-spinner loading-xs"></span>
                            : ''
                        }
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddAsset;