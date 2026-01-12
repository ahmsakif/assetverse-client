import React from 'react';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaChartLine, FaCheckCircle } from 'react-icons/fa';

const AuthContentTwo = () => {
    return (
        <div className="h-full w-full flex flex-col justify-center items-center p-12 relative overflow-hidden">

            {/* --- BACKGROUND FX --- */}
            {/* Grid Pattern Overlay to add texture to the Layout's gradient */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)] opacity-30"></div>

            {/* Floating Orbs */}
            <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute top-20 right-20 w-64 h-64 bg-purple-500 rounded-full blur-[100px] opacity-40 mix-blend-overlay"
            ></motion.div>
            <motion.div 
                animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 10, repeat: Infinity, delay: 1 }}
                className="absolute bottom-20 left-20 w-80 h-80 bg-blue-400 rounded-full blur-[100px] opacity-40 mix-blend-overlay"
            ></motion.div>


            {/* --- MAIN CONTENT --- */}
            <div className="relative z-10 w-full max-w-lg">
                
                {/* 1. Floating Glass Card (Visual Hook) */}
                <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mb-12 relative"
                >
                    {/* Main Card */}
                    <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-3xl shadow-2xl relative overflow-hidden group">
                        {/* Shimmer Effect */}
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
                        
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-200 border border-blue-400/30">
                                    <FaChartLine />
                                </div>
                                <div>
                                    <div className="h-2 w-24 bg-white/30 rounded-full mb-2"></div>
                                    <div className="h-2 w-16 bg-white/10 rounded-full"></div>
                                </div>
                            </div>
                            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                                +24% Efficiency
                            </span>
                        </div>
                        
                        <div className="space-y-2">
                            <div className="h-3 w-full bg-white/5 rounded-full"></div>
                            <div className="h-3 w-3/4 bg-white/5 rounded-full"></div>
                        </div>
                    </div>

                    {/* Floating Badge (Notification) */}
                    <motion.div 
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -right-6 -bottom-6 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3"
                    >
                        <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                            <FaCheckCircle />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase">Status</p>
                            <p className="text-xs font-black text-gray-800">Asset Returned</p>
                        </div>
                    </motion.div>
                </motion.div>

                {/* 2. Text Content */}
                <div className="text-center space-y-6">
                    <motion.h2 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="text-4xl md:text-5xl font-black tracking-tight text-white leading-tight drop-shadow-lg"
                    >
                        Turn Chaos into <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-purple-200">
                            Clarity.
                        </span>
                    </motion.h2>

                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="text-lg text-blue-100/90 font-medium leading-relaxed"
                    >
                        The intelligent way to manage corporate assets. Track inventory, assign tools, and streamline your HR workflow instantly.
                    </motion.p>
                </div>

                {/* 3. Trust Indicators */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-12 pt-8 border-t border-white/10 flex justify-center gap-8"
                >
                    <div className="flex items-center gap-3">
                        <FaShieldAlt className="text-blue-300 text-xl" />
                        <div className="text-left">
                            <p className="text-white font-bold text-sm">Enterprise</p>
                            <p className="text-blue-200/60 text-xs">Security Class</p>
                        </div>
                    </div>
                    <div className="w-px h-10 bg-white/10"></div>
                    <div className="flex items-center gap-3">
                        <FaChartLine className="text-purple-300 text-xl" />
                        <div className="text-left">
                            <p className="text-white font-bold text-sm">Real-time</p>
                            <p className="text-blue-200/60 text-xs">Analytics</p>
                        </div>
                    </div>
                </motion.div>

            </div>
        </div>
    );
};

export default AuthContentTwo;