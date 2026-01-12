import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import LoadingSpinner from '../../Utilities/LoadingSpinner';
import { FaEdit, FaCamera, FaTimes, FaSave, FaUser, FaPhone, FaEnvelope, FaBuilding } from 'react-icons/fa';
import Swal from 'sweetalert2';

const image_hosting_key = import.meta.env.VITE_IMAGE_BB_API_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Profile = () => {
    const { user, updateUserProfile } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [editMode, setEditMode] = useState(false);

    const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm();

    const { data: dbUser = {}, isLoading, refetch } = useQuery({
        queryKey: ['profile', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`);
            return res.data;
        }
    });

    // Effect to reset form when data is loaded or edit mode is toggled
    useEffect(() => {
        if (dbUser) {
            reset({
                name: dbUser?.name || '',
                phone: dbUser?.phone || ''
            });
        }
    }, [dbUser, reset, editMode]);

    const { data: companies = [] } = useQuery({
        queryKey: ['affiliations', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/my-affiliations?email=${user.email}`);
            return res.data;
        }
    });

    if (isLoading) return <LoadingSpinner />;

    const onSubmit = async (data) => {
        try {
            let photoURL = dbUser.photoURL || user.photoURL;

            if (data.userPhoto?.[0]) {
                const formData = new FormData();
                formData.append('image', data.userPhoto[0]);
                const imgRes = await axios.post(image_hosting_api, formData);
                photoURL = imgRes.data.data.display_url;
            }

            const updatedData = { name: data.name, phone: data.phone, photoURL };
            await axiosSecure.patch(`/users/${user.email}`, updatedData);
            await updateUserProfile(data.name, photoURL);

            Swal.fire({ icon: 'success', title: 'Profile Updated', showConfirmButton: false, timer: 1500 });
            refetch();
            setEditMode(false);
        } catch (error) {
            Swal.fire({ icon: 'error', title: 'Update Failed', text: 'Something went wrong.' });
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 rounded-3xl py-12 px-4 sm:px-6">
            <title>My Profile - AssetVerse</title>
            <div className="max-w-4xl mx-auto">
                <div className="bg-white shadow-2xl rounded-3xl overflow-hidden border border-slate-100">

                    {/* ================= HEADER / COVER ================= */}
                    <div className="h-48 bg-gradient-to-br from-indigo-600 via-blue-600 to-emerald-500 relative">
                        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

                        <div className="absolute -bottom-13 left-10 flex items-end gap-6">
                            <div className="relative group">
                                <div className="w-40 h-40 rounded-3xl border-4 border-white shadow-2xl overflow-hidden bg-white">
                                    <img
                                        src={dbUser.photoURL || user.photoURL || "https://i.ibb.co/pL1p6w4/user.png"}
                                        className="w-full h-full object-cover"
                                        alt="profile"
                                    />
                                </div>
                                {editMode && (
                                    <label className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer rounded-3xl transition-opacity">
                                        <FaCamera className="text-white text-3xl" />
                                        <input type="file" {...register('userPhoto')} className="hidden" />
                                    </label>
                                )}
                            </div>

                            <div className="mb-4 pb-2 hidden sm:block bg-slate-900/10 backdrop-blur-md px-6 py-4 rounded-3xl shadow-2xl border border-white/10">

                                <h1 className="text-4xl font-black text-white drop-shadow-sm mb-1">
                                    {dbUser.name}
                                </h1>

                                <div className="flex">
                                    <span className="px-3 py-1 bg-indigo-500 text-indigo-100 rounded-full text-[12px] font-black uppercase tracking-[0.1em] border border-indigo-400/30">
                                        {dbUser.role === 'hr' ? 'HR Director' : 'Professional Staff'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="absolute top-6 right-10">
                            <button
                                onClick={() => setEditMode(!editMode)}
                                className={`btn btn-md gap-2 rounded-2xl shadow-lg transition-all duration-300 ${editMode ? 'btn-error text-white' : 'btn-white bg-white border-none text-indigo-600 hover:bg-slate-100'}`}
                            >
                                {editMode ? <><FaTimes /> Cancel</> : <><FaEdit /> Edit Profile</>}
                            </button>
                        </div>
                    </div>

                    {/* ================= BODY ================= */}
                    <div className="p-10 pt-24">

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">

                                {/* Information Block: Full Name */}
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                        <FaUser className="text-indigo-500" /> Full Name
                                    </label>
                                    {editMode ? (
                                        <input
                                            {...register('name', { required: true })}
                                            className="input input-bordered w-full rounded-xl focus:ring-2 ring-indigo-500 border-slate-200"
                                        />
                                    ) : (
                                        <p className="text-xl font-semibold text-slate-800">{dbUser.name}</p>
                                    )}
                                </div>

                                {/* Information Block: Email (Read Only) */}
                                <div className="space-y-1 opacity-80">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                        <FaEnvelope className="text-indigo-500" /> Professional Email
                                    </label>
                                    <p className="text-xl font-semibold text-slate-600 italic">{user.email}</p>
                                </div>

                                {/* Information Block: Phone */}
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                        <FaPhone className="text-indigo-500" /> Mobile Number
                                    </label>
                                    {editMode ? (
                                        <input
                                            {...register('phone')}
                                            placeholder="+1 (555) 000-0000"
                                            className="input input-bordered w-full rounded-xl focus:ring-2 ring-indigo-500 border-slate-200"
                                        />
                                    ) : (
                                        <p className="text-xl font-semibold text-slate-800">{dbUser.phone || "Not Provided"}</p>
                                    )}
                                </div>

                                {/* Role (Non-editable for security) */}
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                        <FaBuilding className="text-indigo-500" /> User Role
                                    </label>
                                    <p className="text-xl font-semibold text-slate-800 uppercase ">{dbUser.role || 'Member'}</p>
                                </div>

                            </div>

                            {/* ================= AFFILIATIONS ================= */}
                            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100">
                                <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-3">
                                    Verified Affiliations
                                    <span className="h-px bg-slate-200 flex-1"></span>
                                </h3>

                                {companies.length === 0 ? (
                                    <div className="text-center py-4 bg-white rounded-2xl border-2 border-dashed border-slate-200">
                                        <p className="text-slate-400 font-medium">No verified company affiliations found.</p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {companies.map(company => (
                                            <div key={company._id} className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-200 transition-hover hover:shadow-md">
                                                <img src={company.companyLogo} className="w-12 h-12 rounded-xl object-contain bg-slate-50" alt="logo" />
                                                <div>
                                                    <p className="font-bold text-slate-800">{company.companyName}</p>
                                                    <p className="text-[10px] text-emerald-600 font-black uppercase tracking-tighter">Verified Member</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* SAVE ACTION */}
                            {editMode && (
                                <div className="flex justify-end pt-4 animate-in fade-in slide-in-from-bottom-2">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="btn btn-lg btn-primary gap-3 rounded-2xl px-12 shadow-xl shadow-indigo-200"
                                    >
                                        {isSubmitting ? (
                                            <span className="loading loading-spinner"></span>
                                        ) : (
                                            <><FaSave /> Save Changes</>
                                        )}
                                    </button>
                                </div>
                            )}
                        </form>
                    </div>
                </div>

                <p className="text-center text-slate-400 text-sm mt-8">
                    AssetVerse Member since {new Date(dbUser.joinedAt).getFullYear() || "2024"} • System ID: {dbUser._id?.slice(-8)}
                </p>
            </div>
        </div>
    );
};

export default Profile;