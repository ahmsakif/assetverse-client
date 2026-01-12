import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaPaperPlane } from 'react-icons/fa';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const Contact = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const onSubmit = (data) => {
        console.log(data);
        toast.success("Message sent successfully!");
        reset();
    };

    return (
        <div className="min-h-screen bg-slate-950 pt-24 pb-20 relative overflow-hidden mt-24">

            {/* Background Decor */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1440px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>

            <div className="container mx-auto px-6 relative z-10 max-w-6xl">

                {/* --- HEADER --- */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16 md:mb-24"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
                        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                        Contact Support
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight">
                        Get in Touch
                    </h1>
                    <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        Have questions about our enterprise plans or need technical support?
                        Our team is ready to help you scale.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

                    {/* --- LEFT: Contact Info (Takes 5 columns) --- */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="lg:col-span-5 space-y-6"
                    >
                        <ContactCard
                            icon={<FaEnvelope />}
                            title="Chat with us"
                            desc="We respond within 2 hours."
                            info="support@assetverse.com"
                            color="text-blue-400"
                            bg="bg-blue-500/10"
                        />
                        <ContactCard
                            icon={<FaMapMarkerAlt />}
                            title="Visit us"
                            desc="Come say hello at our HQ."
                            info="100 Tech Park, Silicon Valley, CA"
                            color="text-emerald-400"
                            bg="bg-emerald-500/10"
                        />
                        <ContactCard
                            icon={<FaPhoneAlt />}
                            title="Call us"
                            desc="Mon-Fri from 8am to 5pm."
                            info="+1 (555) 000-0000"
                            color="text-purple-400"
                            bg="bg-purple-500/10"
                        />
                    </motion.div>

                    {/* --- RIGHT: Form (Takes 7 columns) --- */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="lg:col-span-7"
                    >
                        <div className="bg-slate-900 border border-slate-800 p-8 md:p-10 rounded-3xl shadow-2xl relative overflow-hidden">
                            {/* Subtle Form Glow */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none"></div>

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative z-10">

                                {/* Name Row: Stack on mobile, Side-by-side on tablet+ */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="form-control">
                                        <label className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2 ml-1">First Name</label>
                                        <input
                                            {...register("firstName", { required: "Required" })}
                                            type="text"
                                            className="w-full bg-slate-950 border border-slate-800 text-white placeholder-slate-600 text-sm font-medium rounded-xl px-4 py-3.5 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                                            placeholder="Jane"
                                        />
                                        {errors.firstName && <span className="text-rose-500 text-xs mt-1 ml-1">Required</span>}
                                    </div>
                                    <div className="form-control">
                                        <label className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2 ml-1">Last Name</label>
                                        <input
                                            {...register("lastName", { required: "Required" })}
                                            type="text"
                                            className="w-full bg-slate-950 border border-slate-800 text-white placeholder-slate-600 text-sm font-medium rounded-xl px-4 py-3.5 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                                            placeholder="Doe"
                                        />
                                        {errors.lastName && <span className="text-rose-500 text-xs mt-1 ml-1">Required</span>}
                                    </div>
                                </div>

                                {/* Email Row */}
                                <div className="form-control">
                                    <label className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2 ml-1">Work Email</label>
                                    <input
                                        {...register("email", {
                                            required: "Email is required",
                                            pattern: { value: /^\S+@\S+$/i, message: "Invalid email" }
                                        })}
                                        type="email"
                                        className="w-full bg-slate-950 border border-slate-800 text-white placeholder-slate-600 text-sm font-medium rounded-xl px-4 py-3.5 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                                        placeholder="you@company.com"
                                    />
                                    {errors.email && <span className="text-rose-500 text-xs mt-1 ml-1">{errors.email.message}</span>}
                                </div>

                                {/* Message Row */}
                                <div className="form-control">
                                    <label className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2 ml-1">Message</label>
                                    <textarea
                                        {...register("message", { required: "Message is required" })}
                                        className="w-full bg-slate-950 border border-slate-800 text-white placeholder-slate-600 text-sm font-medium rounded-xl px-4 py-3.5 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all min-h-[150px] resize-none"
                                        placeholder="Tell us about your project or inquiry..."
                                    ></textarea>
                                    {errors.message && <span className="text-rose-500 text-xs mt-1 ml-1">{errors.message.message}</span>}
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="btn btn-primary w-full h-12 rounded-xl font-bold text-white shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40 hover:-translate-y-0.5 transition-all text-sm uppercase tracking-widest gap-3"
                                >
                                    Send Message <FaPaperPlane />
                                </button>
                            </form>
                        </div>
                    </motion.div>

                </div>
            </div>
        </div>
    );
};

// --- SUB-COMPONENTS ---

const ContactCard = ({ icon, title, desc, info, color, bg }) => (
    <motion.div
        whileHover={{ x: 5 }}
        className="flex items-start gap-5 p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 hover:bg-slate-900 transition-all duration-300"
    >
        <div className={`p-3.5 rounded-xl text-xl shrink-0 ${bg} ${color}`}>
            {icon}
        </div>
        <div>
            <h3 className="text-white font-bold text-lg mb-1">{title}</h3>
            <p className="text-slate-400 text-sm mb-2">{desc}</p>
            <p className={`font-bold text-sm ${color}`}>{info}</p>
        </div>
    </motion.div>
);

export default Contact;