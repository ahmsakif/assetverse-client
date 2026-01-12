import React from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { FaArrowRight, FaCheckCircle, FaBoxOpen } from 'react-icons/fa';

const Banner = () => {
    return (
        <div className='relative w-full min-h-[700px] bg-slate-900 overflow-hidden flex items-center py-40'>

            {/* --- BACKGROUND EFFECTS --- */}
            {/* 1. Tech Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

            {/* 2. Gradient Blobs */}
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/30 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>

            <div className='max-w-[1440px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-36 items-center relative z-10'>

                {/* --- LEFT SIDE: Copywriting --- */}
                <div className='text-center lg:text-left space-y-8'>

                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-widest"
                    >
                        <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
                        Asset Management System v2.0
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className='text-5xl md:text-7xl font-black text-white leading-tight tracking-tight'
                    >
                        Master Your <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
                            Corporate Assets
                        </span>
                    </motion.h1>

                    {/* Subhead */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className='text-slate-400 text-lg md:text-xl max-w-xl mx-auto lg:mx-0 leading-relaxed'
                    >
                        Eliminate spreadsheets and confusion. AssetVerse empowers HR teams to track, assign, and recover equipment with zero friction.
                    </motion.p>

                    {/* CTAs */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                    >
                        <Link to="/join-hr" className="group btn btn-lg bg-blue-600 hover:bg-blue-500 text-white border-none rounded-2xl px-8 font-bold shadow-lg shadow-blue-900/50 hover:shadow-blue-600/40 transition-all hover:-translate-y-1">
                            Start as HR Manager <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link to="/join-employee" className="btn btn-lg bg-white/5 hover:bg-white/10 text-white border-white/10 hover:border-white/30 backdrop-blur-md rounded-2xl px-8 font-bold transition-all">
                            Employee Login
                        </Link>
                    </motion.div>

                    {/* Trust Indicators */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="pt-8 border-t border-white/5 flex items-center justify-center lg:justify-start gap-6 text-slate-500 text-sm font-semibold uppercase tracking-widest"
                    >
                        <span>Trusted by modern teams</span>
                    </motion.div>
                </div>

                {/* --- RIGHT SIDE: Glassmorphism Visuals --- */}
                <div className='relative w-full h-[500px] flex items-center justify-center perspective-1000'>

                    {/* MAIN DASHBOARD CARD (Glass) */}
                    <motion.div
                        initial={{ rotateY: -10, rotateX: 10, opacity: 0 }}
                        animate={{ rotateY: -5, rotateX: 5, opacity: 1 }}
                        transition={{ duration: 1, type: "spring" }}
                        className="relative z-10 w-[90%] max-w-[500px] bg-slate-800/60 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-2xl shadow-black/50"
                    >
                        {/* Fake Header */}
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                            </div>
                            <div className="h-2 w-20 bg-white/10 rounded-full"></div>
                        </div>

                        {/* Fake List Items */}
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                    <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400">
                                        <FaBoxOpen />
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        <div className="h-2 w-24 bg-white/20 rounded-full"></div>
                                        <div className="h-2 w-16 bg-white/10 rounded-full"></div>
                                    </div>
                                    <div className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-400 text-xs font-bold">
                                        Active
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* FLOATING CARD 1: Notification */}
                    <motion.div
                        animate={{ y: [0, -15, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-10 right-0 md:-right-4 bg-white p-4 rounded-2xl shadow-xl shadow-blue-900/20 flex items-center gap-4 z-20 max-w-[200px]"
                    >
                        <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                            <FaCheckCircle size={20} />
                        </div>
                        <div>
                            <p className="text-[10px] uppercase font-bold text-slate-400">System</p>
                            <p className="text-sm font-bold text-slate-800 leading-tight">MacBook Assigned</p>
                        </div>
                    </motion.div>

                    {/* FLOATING CARD 2: Stats */}
                    <motion.div
                        animate={{ y: [0, 15, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        className="absolute bottom-20 left-0 md:-left-8 bg-slate-900 border border-slate-700 p-4 rounded-2xl shadow-2xl flex items-center gap-4 z-20"
                    >
                        <div className="text-center">
                            <p className="text-2xl font-black text-white">142</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase">Total Assets</p>
                        </div>
                        <div className="h-8 w-[1px] bg-slate-700"></div>
                        <div className="text-center">
                            <p className="text-2xl font-black text-blue-400">98%</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase">Utilization</p>
                        </div>
                    </motion.div>

                </div>
            </div>
        </div>
    );
};

export default Banner;