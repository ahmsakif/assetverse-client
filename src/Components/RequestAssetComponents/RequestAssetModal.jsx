import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAuth from '../../Hooks/useAuth';
import useAxios from '../../Hooks/useAxios';


const RequestAssetModal = ({ asset, setAsset }) => {
    // const { _id, productName, productImage, productType, productQuantity, dateAdded, availableQuantity } = asset;
    const { user } = useAuth();
    const axiosInstance = useAxios();
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
            requesterName: user?.displayName,
            requesterEmail: user?.email,
            hrEmail: asset.hrEmail,
            companyName: asset.companyName,
            requestDate: new Date(),
            requestStatus: 'pending',
            note: data.note,
        };

        try {
            const res = await axiosInstance.post('/requests', requestData);

            if (res.data.insertedId) {
                Swal.fire({
                    title: 'Request Sent!',
                    text: 'Your request is pending approval.',
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false
                });
                handleClose();
            }
        } catch (error) {
            console.error(error);
            handleClose();
            Swal.fire({
                title: 'Error',
                text: error.response?.data?.message || 'Failed to request asset',
                icon: 'error',
                confirmButtonText: 'Try Again'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <dialog id="request_modal" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
                {/* Header */}
                <h3 className="font-bold text-lg mb-4">
                    Requesting: <span className="text-primary">{asset?.productName}</span>
                </h3>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="w-full flex items-start gap-2 mb-2">
                        <div className='flex-1'>
                            <img className='' src={asset?.productImage} alt="" />
                        </div>
                        <div className='flex-1 pt-4 text-lg'>
                            <h2 className='border-b pb-1 mb-2 font-semibold'>Asset Information </h2>
                            <p className=' text-black'>Company : <span className='font-bold'>{asset?.companyName}</span></p>
                            <p className=' text-black'>HR email : <span className='font-bold'>{asset?.hrEmail}</span></p>
                            <p className=' text-black'>Available : <span className='font-bold'>{asset?.availableQuantity}</span></p>
                            <p className=' text-black '>Type : <span className='font-bold text-red-500'>{asset?.productType}</span></p>

                        </div>
                    </div>
                    <div className='mb-2'>
                        <h2 className='text-lg text-black mb-1'>{asset?.productName}</h2>
                        <p className='text-sm'>Asset ID: {asset?._id}</p>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Additional Note (Optional)</span>
                        </label>
                        <textarea
                            className="textarea w-full textarea-bordered h-24"
                            placeholder="E.g. My current mouse is broken..."
                            {...register("note")}
                        ></textarea>
                    </div>

                    {/* Actions */}
                    <div className="modal-action">
                        <button
                            type="button"
                            className="btn"
                            onClick={handleClose}
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading}
                        >
                            {loading ? <span className="loading loading-spinner loading-xs"></span> : 'Send Request'}
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