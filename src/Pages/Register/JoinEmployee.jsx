import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { FaArrowRight, FaArrowLeft, FaCheck, FaUserTie, FaIdCard, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import axios from 'axios';

import useAuth from '../../Hooks/useAuth';
import useAxios from '../../Hooks/useAxios';
import { handleFirebaseError } from '../../Utilities/handleFirebaseError';

// Icons
import EmailIcon from '../../Components/Icons/EmailIcon';
import PasswordIcon from '../../Components/Icons/PasswordIcon';
import ProfileIcon from '../../Components/Icons/ProfileIcon';

const image_hosting_key = import.meta.env.VITE_IMAGE_BB_API_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const JoinEmployee = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [showPasswordRules, setShowPasswordRules] = useState(false);
    const navigate = useNavigate();
    const { createUser, updateUserProfile, setLoading } = useAuth();
    const axiosInstance = useAxios();

    const {
        register,
        handleSubmit,
        trigger,
        watch,
        reset,
        formState: { errors }
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
            fullName: "",
        }
    });

    // --- PASSWORD LOGIC ---
    const password = watch("password", "");
    const requirements = [
        { label: "6+ Chars", valid: password.length >= 6 },
        { label: "Uppercase", valid: /[A-Z]/.test(password) },
        { label: "Lowercase", valid: /[a-z]/.test(password) },
        { label: "Number", valid: /[0-9]/.test(password) },
    ];

    const steps = [
        { id: 0, title: "Credentials", icon: <FaUserTie /> },
        { id: 1, title: "Personal Info", icon: <FaIdCard /> },
    ];

    // --- NAVIGATION ---
    const handleNextStep = async () => {
        const fields = [
            ["email", "password"],
            ["fullName", "dateOfBirth", "userPhoto"],
        ];
        const isValid = await trigger(fields[currentStep]);
        if (isValid) setCurrentStep((prev) => prev + 1);
    };

    const handlePrevStep = () => setCurrentStep((prev) => prev - 1);

    // --- SUBMISSION ---
    const handleEmployeeRegistration = async (data) => {
        const toastId = toast.loading("Creating your employee profile...");
        try {
            // Upload Image
            const uploadImage = async (file) => {
                const formData = new FormData();
                formData.append('image', file[0]);
                const res = await axios.post(image_hosting_api, formData);
                return res.data.data.display_url;
            };

            const userPhotoURL = await uploadImage(data.userPhoto);

            // Create Firebase User
            await createUser(data.email, data.password);
            await updateUserProfile(data.fullName, userPhotoURL);

            // Save to DB
            const userData = {
                name: data.fullName,
                email: data.email,
                role: "employee",
                dateOfBirth: data.dateOfBirth,
                userPhoto: userPhotoURL,
            };

            const res = await axiosInstance.post('/users', userData);
            if (res.data.insertedId) {
                toast.success("Profile created! Please login.", { id: toastId });
                reset();
                navigate('/login');
            }
        } catch (error) {
            setLoading(false);
            handleFirebaseError(error.code, toastId);
        }
    };

    return (
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center bg-white min-h-screen lg:rounded-r-[80px] relative z-10 shadow-2xl animate-in slide-in-from-left duration-700">
            <div className="w-full max-w-[500px] px-8 py-12 border-4 border-slate-500/10 shadow-xl rounded-4xl">
                
                {/* Header */}
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-black text-slate-800 tracking-tight mb-2">Join as Employee</h1>
                    <p className="text-slate-500 font-medium text-sm">Create your account to access company assets.</p>
                </div>

                {/* Progress Bar (2 Steps) */}
                <div className="flex justify-center items-center mb-10 relative max-w-xs mx-auto">
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 -z-10 rounded-full"></div>
                    <div 
                        className="absolute top-1/2 left-0 h-1 bg-primary -z-0 rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                    ></div>
                    
                    <div className="w-full flex justify-between">
                        {steps.map((step, index) => (
                            <div key={index} className={`flex flex-col items-center gap-2 bg-white px-2`}>
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                                    index <= currentStep ? 'border-primary bg-primary text-white shadow-lg' : 'border-slate-200 text-slate-300'
                                }`}>
                                    {index < currentStep ? <FaCheck size={12}/> : <span className="text-sm font-bold">{index + 1}</span>}
                                </div>
                                <span className={`text-[10px] font-black uppercase tracking-widest ${index <= currentStep ? 'text-primary' : 'text-slate-300'}`}>
                                    {step.title}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <form onSubmit={handleSubmit(handleEmployeeRegistration)} className="min-h-[400px] flex flex-col">
                    <AnimatePresence mode='wait'>
                        
                        {/* --- STEP 1: CREDENTIALS --- */}
                        {currentStep === 0 && (
                            <motion.div 
                                key="step1"
                                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                                className="space-y-5 flex-1"
                            >
                                <div className="form-control">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 mb-2">Email Address</label>
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"><EmailIcon /></div>
                                        <input 
                                            type="email" 
                                            className="input w-full pl-12 h-14 bg-slate-50 border-slate-200 focus:bg-white focus:ring-4 focus:ring-primary/10 rounded-2xl font-bold text-slate-700"
                                            placeholder="you@company.com"
                                            {...register("email", { required: "Email is required" })}
                                        />
                                    </div>
                                    {errors.email && <span className="text-rose-500 text-xs font-bold ml-1 mt-1">{errors.email.message}</span>}
                                </div>

                                <div className="form-control">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 mb-2">Password</label>
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"><PasswordIcon /></div>
                                        <input 
                                            type="password" 
                                            className="input w-full pl-12 h-14 bg-slate-50 border-slate-200 focus:bg-white focus:ring-4 focus:ring-primary/10 rounded-2xl font-bold text-slate-700"
                                            placeholder="••••••••"
                                            onFocus={() => setShowPasswordRules(true)}
                                            {...register("password", { 
                                                required: "Password is required", 
                                                validate: {
                                                    length: (val) => val.length >= 6 || "Too short",
                                                    upper: (val) => /[A-Z]/.test(val) || "Missing uppercase",
                                                    lower: (val) => /[a-z]/.test(val) || "Missing lowercase",
                                                    number: (val) => /[0-9]/.test(val) || "Missing number"
                                                }
                                            })}
                                        />
                                    </div>
                                    {errors.password && <span className="text-rose-500 text-xs font-bold ml-1 mt-1">{errors.password.message}</span>}
                                </div>

                                {/* Password Rules Animation */}
                                <AnimatePresence>
                                    {showPasswordRules && (
                                        <motion.div 
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="grid grid-cols-2 gap-2 bg-slate-50 p-4 rounded-2xl border border-slate-100 mt-2">
                                                {requirements.map((req, index) => (
                                                    <div key={index} className={`flex items-center gap-2 text-xs font-bold transition-colors duration-300 ${req.valid ? 'text-emerald-500' : 'text-slate-400'}`}>
                                                        <div className={`w-4 h-4 rounded-full flex items-center justify-center border transition-all duration-300 ${req.valid ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300 text-transparent'}`}>
                                                            <FaCheck size={8} />
                                                        </div>
                                                        {req.label}
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        )}

                        {/* --- STEP 2: PERSONAL INFO --- */}
                        {currentStep === 1 && (
                            <motion.div 
                                key="step2"
                                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                                className="space-y-5 flex-1"
                            >
                                <div className="form-control">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 mb-2">Full Name</label>
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"><ProfileIcon /></div>
                                        <input 
                                            type="text" 
                                            className="input w-full pl-12 h-14 bg-slate-50 border-slate-200 focus:bg-white focus:ring-4 focus:ring-primary/10 rounded-2xl font-bold text-slate-700"
                                            placeholder="John Smith"
                                            {...register("fullName", { required: "Name is required" })}
                                        />
                                    </div>
                                </div>

                                <div className="form-control">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 mb-2">Date of Birth</label>
                                    <input 
                                        type="date" 
                                        className="input w-full h-14 bg-slate-50 border-slate-200 focus:bg-white focus:ring-4 focus:ring-primary/10 rounded-2xl font-bold text-slate-700 px-4"
                                        {...register("dateOfBirth", { required: "Required" })}
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 mb-2">Profile Photo</label>
                                    <input 
                                        type="file" 
                                        className="file-input w-full h-14 bg-slate-50 border-slate-200 rounded-2xl file:bg-primary file:text-white file:border-none file:h-full file:mr-4 file:px-6 file:font-bold hover:file:bg-primary-focus"
                                        {...register("userPhoto", { required: "Required" })}
                                    />
                                </div>
                            </motion.div>
                        )}

                    </AnimatePresence>

                    {/* --- ACTIONS --- */}
                    <div className="flex justify-between items-center mt-10 pt-6 border-t border-slate-50">
                        {currentStep > 0 ? (
                            <button 
                                type="button" 
                                onClick={handlePrevStep}
                                className="btn btn-ghost rounded-2xl text-slate-400 font-bold hover:bg-slate-50 gap-2 pl-2"
                            >
                                <FaArrowLeft size={12} /> Back
                            </button>
                        ) : (
                            <div></div>
                        )}

                        {currentStep < steps.length - 1 ? (
                            <button 
                                type="button" 
                                onClick={handleNextStep}
                                className="btn btn-primary rounded-2xl px-8 shadow-xl shadow-primary/20 font-black uppercase tracking-widest text-xs h-12 gap-3"
                            >
                                Next Step <FaArrowRight />
                            </button>
                        ) : (
                            <button 
                                type="submit"
                                className="btn btn-primary rounded-2xl px-10 shadow-xl shadow-primary/30 font-black uppercase tracking-widest text-xs h-12"
                            >
                                Create Account
                            </button>
                        )}
                    </div>
                </form>

                <div className="text-center mt-6">
                    <p className="text-sm font-medium text-slate-400">
                        Already have an account? {' '}
                        <Link to="/login" className="text-primary font-bold hover:underline transition-all">
                            Log In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default JoinEmployee;