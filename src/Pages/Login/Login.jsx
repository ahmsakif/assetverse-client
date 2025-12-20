import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import useAuth from '../../Hooks/useAuth';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import EmailIcon from '../../Components/Icons/EmailIcon';
import PasswordIcon from '../../Components/Icons/PasswordIcon';

import SlideLeft from '../../Components/Animation/SlideLeft';

import Logo from '../../Components/Logo/Logo';
import toast from 'react-hot-toast';
import { handleFirebaseError } from '../../Utilities/handleFirebaseError';
import { handleFirebaseSuccess } from '../../Utilities/handleFirebaseSuccess';


const Login = () => {
    const navigate = useNavigate()
    const { signInUser, setLoading } = useAuth()
    const [showPwd, setShowPwd] = useState(false)

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors }
    } = useForm()


    const handleSignIn = async (data) => {
        const toastId = toast.loading("Logging in to your account...")

        try {
            await signInUser(data.email, data.password);

            handleFirebaseSuccess('login', toastId);
            setLoading(false);
            reset();
            navigate('/dashboard'); 

        } catch (error) {
            // console.log("Login Error Code:", error.code); 
            setLoading(false);
            handleFirebaseError(error.code, toastId);
        }
    }


    return (
        <div className=' min-h-screen bg-base-300 flex'>

            {/* Left Side */}
            <div className='relative min-h-screen bg-base-200 lg:rounded-r-[100px] w-full lg:w-1/2 flex items-center'>
                {/* <Logo></Logo> */}
                <div className=' card w-full overflow-hidden flex flex-col justify-center items-center '>


                    <form
                        onSubmit={handleSubmit(handleSignIn)}
                        className='relative card-body max-w-sm border pt-10 rounded-xl border-gray-200 shadow-r-lg bg-base-100 w-full justify-center overflow-hidden'>

                        <div className="mb-8 text-center">
                            <h1 className="text-2xl font-semibold text-base-content">
                                Good to see you again!
                            </h1>
                            <p className="mt-1 text-sm text-gray-500">
                                Please sign in to manage your assets and requests.
                            </p>
                        </div>
                        {/* Animated Form Content */}


                        <SlideLeft>
                            <div>

                                {/* Email Input */}
                                <div className='form-control mb-3'>
                                    <label className='label mb-1'><span className='label-text'>Email</span></label>
                                    <div
                                        className='input w-full input-bordered'>
                                        <EmailIcon />
                                        <input type="email" placeholder='user@email.com' className=''
                                            {...register("email", {
                                                required: "Email is required",
                                                pattern: {
                                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                    message: "Invalid email address"
                                                }
                                            })} />
                                    </div>
                                    {errors.email && <span className='text-red-500 text-sm mt-2'>{errors.email.message}</span>}
                                </div>
                                {/* Password Input */}
                                <div className='form-control'>
                                    <label className="label mb-1"><span className='label-text'>Password</span></label>
                                    <div
                                        className='input w-full input-bordered '
                                    >
                                        <PasswordIcon />

                                        <input
                                            type={`${showPwd ? 'text' : 'password'}`}
                                            placeholder='Enter your password'
                                            {...register("password",
                                                {
                                                    required: "Password is required",
                                                }
                                            )} />
                                        {
                                            showPwd
                                                ? <FaEye onClick={() => setShowPwd(!showPwd)} className='absolute right-2.5 cursor-default text-lg text-gray-600 h-full ' />
                                                :
                                                <FaEyeSlash onClick={() => setShowPwd(!showPwd)} className='absolute right-2.5 cursor-default text-lg text-gray-600 h-full' />
                                        }
                                    </div>
                                    {errors.password && <span className='text-red-500 text-sm'>{errors.password.message}</span>}
                                </div>
                            </div>
                        </SlideLeft>



                        {/* Navigation Buttons */}
                        <div className='card-actions justify-between mt-6'>
                            <div></div>
                            <button type='submit' className='btn btn-primary h-10'>
                                Sign In
                            </button>
                        </div>
                    </form>
                    <p className='text-center mt-3 text-gray-5 00'><span className='select-none'>Doesn't have any account? </span><span><Link className='text-blue-500 hover:underline font-semibold' to="/login">Create an account</Link></span></p>
                </div>

            </div>
            {/* <div className='min-h-screen  bg-base-200 border-red-600'>
    
                </div> */}
        </div>
    );
};

export default Login;