import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash, FaArrowRight, FaSignInAlt } from 'react-icons/fa';
import toast from 'react-hot-toast';

import useAuth from '../../Hooks/useAuth';
import useAxios from '../../Hooks/useAxios';
import EmailIcon from '../../Components/Icons/EmailIcon';
import PasswordIcon from '../../Components/Icons/PasswordIcon';
import SlideLeft from '../../Components/Animation/SlideLeft';
import { handleFirebaseError } from '../../Utilities/handleFirebaseError';
import { handleFirebaseSuccess } from '../../Utilities/handleFirebaseSuccess';
import DemoLogin from '../../Components/Shared/DemoLogin/DemoLogin';

const Login = () => {
    const navigate = useNavigate();
    const { signInUser, setLoading } = useAuth();
    const [showPwd, setShowPwd] = useState(false);
    const axiosInstance = useAxios();

    const {
        register,
        reset,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm();

    const handleSignIn = async (data) => {
        const toastId = toast.loading("Verifying credentials...");

        try {
            await signInUser(data.email, data.password);
            const user = { email: data.email };
            const res = await axiosInstance.post('/jwt', user);

            if (res.data.token) {
                localStorage.setItem('access-token', res.data.token);
            }

            handleFirebaseSuccess('login', toastId);
            setLoading(false);
            reset();
            navigate('/dashboard');

        } catch (error) {
            setLoading(false);
            handleFirebaseError(error.code, toastId);
        }
    };

    return (
        <div className="w-full lg:w-1/2 flex items-center justify-center bg-white min-h-screen lg:rounded-r-[80px] relative z-10 shadow-2xl animate-in slide-in-from-left duration-700 transition-all">
            
            <div className="w-full max-w-[500px] px-8 py-12 border-4 border-slate-500/10 shadow-xl rounded-4xl">
                {/* --- HEADER --- */}
                <div className="mb-10 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/5 text-primary mb-6">
                        <FaSignInAlt size={28} />
                    </div>
                    <h1 className="text-4xl font-black text-slate-800 tracking-tight mb-3">
                        Welcome Back
                    </h1>
                    <p className="text-slate-500 font-medium">
                        Please enter your details to access your workspace.
                    </p>
                </div>

                <SlideLeft>
                    <form onSubmit={handleSubmit(handleSignIn)} className="space-y-6">

                        {/* Email Input */}
                        <div className="space-y-2">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Email</label>
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors">
                                    <EmailIcon />
                                </div>
                                <input 
                                    type="email" 
                                    placeholder="name@company.com" 
                                    className="input w-full pl-12 h-14 bg-slate-50 border-slate-200 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 rounded-2xl transition-all font-bold text-slate-700 placeholder:text-slate-300"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Invalid email address"
                                        }
                                    })} 
                                />
                            </div>
                            {errors.email && <span className="text-rose-500 text-xs font-bold ml-1 animate-pulse">{errors.email.message}</span>}
                        </div>

                        {/* Password Input */}
                        <div className="space-y-2">
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Password</label>
                                <a href="#" className="text-xs font-bold text-primary hover:underline">Forgot password?</a>
                            </div>
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors">
                                    <PasswordIcon />
                                </div>
                                <input
                                    type={showPwd ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    className="input w-full pl-12 pr-12 h-14 bg-slate-50 border-slate-200 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 rounded-2xl transition-all font-bold text-slate-700 placeholder:text-slate-300"
                                    {...register("password", { required: "Password is required" })} 
                                />
                                <div 
                                    className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-slate-400 hover:text-slate-600 transition-colors p-2"
                                    onClick={() => setShowPwd(!showPwd)}
                                >
                                    {showPwd ? <FaEyeSlash size={18}/> : <FaEye size={18}/>}
                                </div>
                            </div>
                            {errors.password && <span className="text-rose-500 text-xs font-bold ml-1 animate-pulse">{errors.password.message}</span>}
                        </div>

                        {/* Submit Button */}
                        <button 
                            type="submit" 
                            className="btn btn-primary w-full h-14 rounded-2xl text-sm font-black uppercase tracking-widest shadow-xl shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-1 transition-all mt-6 group"
                        >
                            Sign In to Account <FaArrowRight className="group-hover:translate-x-1 transition-transform ml-2" />
                        </button>
                        {/*Demo Login Button */}
                        <DemoLogin setValue={setValue}/>

                    </form>
                </SlideLeft>

                {/* Footer Link */}
                <div className="mt-10 text-center">
                    <p className="text-sm font-medium text-slate-400">
                        New to AssetVerse? {' '}
                        <Link to="/join-as" className="text-primary font-bold hover:underline transition-all">
                            Create an account
                        </Link>
                    </p>
                </div>

            </div>
        </div>
    );
};

export default Login;