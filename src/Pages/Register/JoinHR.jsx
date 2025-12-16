import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import useAuth from '../../Hooks/useAuth';
import { useForm } from 'react-hook-form';
import { motion } from "framer-motion";
import { FaCalendarAlt, FaCheck, FaChevronLeft, FaChevronRight, FaEye, FaEyeSlash, FaRegEnvelope, FaTimes } from 'react-icons/fa';
import EmailIcon from '../../Components/Icons/EmailIcon';
import PasswordIcon from '../../Components/Icons/PasswordIcon';
import ProfileIcon from '../../Components/Icons/ProfileIcon';
import CompanyNameIcon from '../../Components/Icons/CompanyNameIcon';
import SlideLeft from '../../Components/Animation/SlideLeft';
import axios from 'axios';
import toast from 'react-hot-toast';
import useAxios from '../../Hooks/useAxios';

const image_hosting_key = import.meta.env.VITE_IMAGE_BB_API_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const JoinHR = () => {

    const [currentStep, setCurrentStep] = useState(0)
    const navigate = useNavigate()
    const { createUser, updateUserProfile } = useAuth()
    const [showPwd, setShowPwd] = useState(false)
    const [showPasswordRules, setShowPasswordRules] = useState(false)
    const [showStepIndicator, setShowStepIndicator] = useState(false)
    const [submittedStep, setSubmittedStep] = useState(null);
    const axiosInstance = useAxios()

    const {
        register,
        handleSubmit,
        watch,
        trigger,
        formState: { errors }
    } = useForm()


    const password = watch("password", "");

    const steps = [
        { fields: ["email", "password"], title: "Account Credentials" },
        { fields: ["fullName", "dateOfBirth"], title: "Personal Details" },
        { fields: ["companyName", "companyLogo", "package"], title: "Company Setup" },
    ]
    const requirements = [
        { label: "At least 6 characters", valid: password.length >= 6 },
        { label: "Contains an uppercase letter", valid: /[A-Z]/.test(password) },
        { label: "Contains a lowercase letter", valid: /[a-z]/.test(password) },
        { label: "Contains a number", valid: /[0-9]/.test(password) },
    ]

    const handleHrRegistration = async (data) => {
        if (currentStep !== steps.length - 1) return;

        try {
            const toastId = toast.loading("Creating your company workspace...")

            // Upload images to ImgBB
            const userPhoto = { image: data.userPhoto[0] }
            const companyLogo = { image: data.companyLogo[0] }
            const userPhotoRes = await axios.post(image_hosting_api, userPhoto, {
                headers: { 'content-type': 'multipart/form-data' }
            })
            const companyLogoRes = await axios.post(image_hosting_api, companyLogo, {
                headers: { 'content-type': 'multipart/form-data' }
            })
            const userPhotoURL = userPhotoRes.data.data.display_url
            const logoURL = companyLogoRes.data.data.display_url

            // Firebase Registration
            // await createUser(data.email, data.password)
            // await updateUserProfile(data.fullName, userPhotoURL)

            // Save data in MongoDB
            const userData = {
                name: data.fullName,
                email: data.email,
                role: "hr",
                companyName: data.companyName,
                companyLogo: logoURL,
                dateOfBirth: data.dateOfBirth,
                packageLimit: 5,
                subscription: "basic",
                userPhoto: userPhotoURL,

            }

            await axiosInstance.post('/users', userData)
            toast.success("HR Account Created!", { id: toastId });
            // navigate('/');
            console.log('logo url', logoURL, 'user photo url', userPhotoURL);
        }
        catch (error) {
            // console.error(error);
            toast.error("Registration Failed.");
        }
        console.log(data);
    }


    // const handleShowPwd = (e) => {
    //     e.preventDefault()
    //     setShowPwd(!showPwd)
    // }

    const handleNextStep = async () => {
        const isValid = await trigger(steps[currentStep].fields)
        if (isValid) {
            setSubmittedStep(null);
            setCurrentStep((prev) => prev + 1)
        } else {
            setSubmittedStep(currentStep)
        }
        console.log(currentStep);
    }

    const handlePrevStep = () => {
        setCurrentStep((prev) => prev - 1)
    }

    return (
        <div className='min-h-screen bg-base-300 flex'>
            {/* Left Side */}
            <div className=' min-h-screen bg-base-200 border-amber-600 lg:rounded-r-[100px] w-full lg:w-1/2 justify-center flex items-center'>

                <div className=' card w-full overflow-hidden flex flex-col justify-center items-center '>


                    <form
                        onSubmit={handleSubmit(handleHrRegistration)}
                        onKeyDown={e => {
                            if (e.key === "Enter" && currentStep < steps.length - 1) {
                                e.preventDefault()
                                handleNextStep()
                            }
                        }}
                        className='relative card-body max-w-md border pt-10 rounded-xl border-gray-200 shadow-r-lg bg-base-100 w-full justify-center overflow-hidden'>
                        {
                            showStepIndicator && <div className=' absolute top-0 left-0  h-1 w-full bg-gray-200 rounded-full overflow-hidden '>
                                <div className={`absolute left-0 top-0 h-full bg-primary transition-all duration-500 
                            ${currentStep === 0
                                        ? 'w-1/3'
                                        : currentStep === 1
                                            ? 'w-2/3' : 'w-full'
                                    }
                            `}
                                >

                                </div>
                            </div>
                        }

                        <div className="mb-8 text-center">
                            <h1 className="text-2xl font-semibold text-base-content">
                                Create HR Account
                            </h1>
                            <p className="mt-1 text-sm text-gray-500">
                                Set up your profile and company to start managing your team.
                            </p>
                        </div>

                        {/* Step Indicator */}


                        {/* Animated Form Content */}



                        {/* Step 1 */}
                        {
                            currentStep === 0 && (
                                <motion.div
                                    initial={{ x: 50, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    className="space-y-4"
                                >
                                    <div>
                                        <h2 className='text-lg mb-3 font-semibold'>{steps[0].title}</h2>
                                        {/* Email Input */}
                                        <div className='form-control mb-3'>
                                            <label className='label mb-1'><span className='label-text'>Email</span></label>
                                            <div
                                                onFocus={() => setShowStepIndicator(true)}
                                                className='input w-full input-bordered validator'>
                                                <EmailIcon />
                                                <input type="email" placeholder='hr@company.com' className=''
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
                                                onChange={() => {
                                                    setShowPasswordRules(true)
                                                    setShowStepIndicator(true)
                                                }}
                                                // onBlur={() => setShowPasswordRules(false)}
                                                className='input w-full input-bordered validator'
                                            >
                                                <PasswordIcon />
                                                {
                                                    showPwd
                                                        ? <FaEye onClick={() => setShowPwd(!showPwd)} className='absolute right-2.5 cursor-default text-lg text-gray-600 h-full ' />
                                                        :
                                                        <FaEyeSlash onClick={() => setShowPwd(!showPwd)} className='absolute right-2.5 cursor-default text-lg text-gray-600 h-full' />
                                                }
                                                <input
                                                    type={`${showPwd ? 'text' : 'password'}`}
                                                    placeholder='Create a password'
                                                    {...register("password",
                                                        {
                                                            required: "Password is required",
                                                            validate: {
                                                                length: (val) => val.length >= 6 || "Must be at least 6 characters",
                                                                upper: (val) => /[A-Z]/.test(val) || "Need uppercase letter",
                                                                lower: (val) => /[a-z]/.test(val) || "Need lowercase letter",
                                                                number: (val) => /[0-9]/.test(val) || "Need a number"
                                                            }
                                                        }
                                                    )} />
                                            </div>
                                            {errors.password && <span className='text-red-500 text-sm'>{errors.password.message}</span>}
                                        </div>
                                        {/* Validation checklist */}
                                        {
                                            showPasswordRules && (
                                                <div className='mt-4'>
                                                    <p className='font-semibold mb-2 text-gray-500 text-xs uppercase tracking-wide'>Password must contain:</p>
                                                    <div className='space-y-1'>
                                                        {
                                                            requirements.map((req, index) => (
                                                                <div
                                                                    key={index}
                                                                    className={`flex items-center gap-2 transition-all duration-300 ${req.valid ? 'text-success' : 'text-gray-400'}`}
                                                                >
                                                                    {
                                                                        req.valid ? <FaCheck className='text-xs'></FaCheck> : <FaTimes className='text-xs'></FaTimes>
                                                                    }
                                                                    <span className={req.valid ? 'line-through opacity-70' : ''}>
                                                                        {
                                                                            req.label
                                                                        }
                                                                    </span>
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </div>
                                </motion.div>
                            )
                        }

                        {/* Step-2 */}
                        {currentStep === 1 && (
                            <SlideLeft>
                                <div>
                                    <h2 className='text-lg mb-3 font-semibold'>{steps[1].title}</h2>
                                    {/* Name Input */}
                                    <div className='form-control mb-3 '>
                                        <label className='label mb-1'><span className='label-text'>Full Name</span></label>
                                        <div className='input w-full input-bordered'>
                                            <ProfileIcon />
                                            <input type="text" placeholder='Full Name' className=''
                                                {...register("fullName", { required: "Name is required" })} />
                                        </div>
                                        {errors.fullName && <span className='text-red-500 text-sm'>{errors.fullName.message}</span>}
                                    </div>
                                    {/* DOB Input */}
                                    <div className="form-control">
                                        <label className="label mb-1">
                                            <span className="label-text">Date of Birth</span>
                                        </label>

                                        <div className="input input-bordered w-full flex items-center gap-2 mb-3">
                                            <FaCalendarAlt className="text-gray-400" />

                                            <input
                                                type="date"
                                                {...register("dateOfBirth", { required: "Date of Birth is required" })}
                                            />
                                        </div>

                                        {errors.dateOfBirth && (
                                            <span className="text-red-500 text-sm">
                                                {errors.dateOfBirth.message}
                                            </span>
                                        )}
                                    </div>
                                    {/* Profile Photo */}
                                    <div className='form-control'>
                                        <label className="label mb-1"><span className='label-text'>Your Photo</span></label>
                                        <div>
                                            <input type="file" placeholder='your company logo' className='file-input file-input-bordered w-full'
                                                {...register("userPhoto", { required: "Profile Photo is required" })} />
                                        </div>
                                        {submittedStep === 2 && errors.userPhoto && <span className='text-red-500 text-sm'>{errors.userPhoto.message}</span>}
                                    </div>
                                </div>
                            </SlideLeft>
                        )}

                        {/* Step-3 */}
                        {currentStep === 2 && (
                            <SlideLeft>
                                <div>
                                    <h2 className='text-lg mb-3  font-semibold'>{steps[2].title}</h2>
                                    {/*Company Name Input */}
                                    <div className='form-control mb-3'>
                                        <label className='label mb-1'><span className='label-text'>Company Name</span></label>
                                        <div className='input w-full input-bordered'>
                                            <CompanyNameIcon />
                                            <input type="text" placeholder='Tech Solutions Inc'
                                                {...register("companyName", { required: "Company Name is required" })} />
                                        </div>
                                        {submittedStep === 2 && errors.companyName && <span className='text-red-500 text-sm'>{errors.companyName.message}</span>}
                                    </div>
                                    {/* Logo Input */}
                                    <div className='form-control'>
                                        <label className="label mb-1"><span className='label-text'>Company Logo</span></label>
                                        <div>
                                            <input type="file" placeholder='your company logo' className='file-input file-input-bordered w-full'
                                                {...register("companyLogo", { required: "Company Logo is required" })} />
                                        </div>
                                        {submittedStep === 2 && errors.companyLogo && <span className='text-red-500 text-sm'>{errors.companyLogo.message}</span>}
                                    </div>
                                </div>
                            </SlideLeft>
                        )}


                        {/* Navigation Buttons */}
                        <div className='card-actions justify-between mt-6'>

                            {/* Back Button */}
                            {
                                currentStep > 0 ? (
                                    <button onClick={handlePrevStep} type='button' className='btn btn-outline border-0 btn-primary font-semibold flex justify-center items-center h-10'>
                                        <FaChevronLeft className='mr-0.5' /> <span>Back</span>
                                    </button>
                                )
                                    : (<div></div>)
                            }

                            {/* Next Button */}
                            {
                                currentStep < steps.length - 1 ? (
                                    <button type='button' onClick={handleNextStep} className='ml-0.5 btn btn-primary h-10'>
                                        Next <FaChevronRight />
                                    </button>
                                ) : (
                                    <button type='submit' className='btn btn-primary h-10'>
                                        Sign Up
                                    </button>
                                )
                            }
                        </div>
                    </form>

                </div>

            </div>
            {/* <div className='min-h-screen  bg-base-200 border-red-600'>

            </div> */}
        </div>
    );
};

export default JoinHR;