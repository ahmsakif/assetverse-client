import React, { useEffect } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import {
    FaLaptopCode, FaUserCheck, FaClipboardList, FaMobileAlt,
    FaShieldAlt, FaChartPie, FaBell, FaFileExport, FaArrowRight
} from 'react-icons/fa';
import { MdOutlineInventory2, MdHistory } from 'react-icons/md';
import { TbHierarchy3 } from 'react-icons/tb';

const Features = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="mt-24 min-h-screen bg-slate-950 pt-24 pb-20 relative overflow-hidden font-sans">

            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-blue-900/10 to-transparent pointer-events-none"></div>
            <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="container mx-auto px-8 relative z-10 max-w-[1440px]">

                {/* --- HERO SECTION --- */}
                <div className="text-center mb-24 max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6"
                    >
                        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                        Platform Capabilities
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-tight"
                    >
                        Everything you need to <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                            master your inventory.
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-400 text-lg md:text-xl leading-relaxed"
                    >
                        From procurement to retirement, AssetVerse handles the entire lifecycle of your company's physical assets with military-grade precision.
                    </motion.p>
                </div>

                {/* --- BENTO GRID FEATURES --- */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32"
                >
                    {/* Large Card: Real Time Tracking */}
                    <motion.div variants={itemVariants} className="md:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-8 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                            <MdOutlineInventory2 size={200} />
                        </div>
                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-blue-900/50">
                                <FaLaptopCode size={24} />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3">Real-Time Asset Tracking</h3>
                            <p className="text-slate-400 max-w-md">
                                Monitor the status, location, and assignee of every asset in your organization instantly.
                                Never lose track of a laptop or keycard again.
                            </p>
                        </div>
                    </motion.div>

                    {/* Small Card: Employee Portal */}
                    <motion.div variants={itemVariants} className="bg-slate-900 border border-slate-800 rounded-3xl p-8 group hover:border-blue-500/30 transition-colors">
                        <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white mb-6">
                            <FaUserCheck size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Employee Portal</h3>
                        <p className="text-slate-400 text-sm">
                            Self-service portal for employees to request equipment and view their assigned items.
                        </p>
                    </motion.div>

                    {/* Small Card: Reports */}
                    <motion.div variants={itemVariants} className="bg-slate-900 border border-slate-800 rounded-3xl p-8 group hover:border-emerald-500/30 transition-colors">
                        <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center text-white mb-6">
                            <FaFileExport size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Printable Reports</h3>
                        <p className="text-slate-400 text-sm">
                            Generate PDF reports for audits with one click. Export data for compliance.
                        </p>
                    </motion.div>

                    {/* Large Card: Lifecycle Management */}
                    <motion.div variants={itemVariants} className="md:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-8 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                            <MdHistory size={200} />
                        </div>
                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-purple-600 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-purple-900/50">
                                <TbHierarchy3 size={24} />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3">Full Lifecycle Management</h3>
                            <p className="text-slate-400 max-w-md">
                                Track an item from purchase to retirement. Log maintenance history, depreciation,
                                and return status (Returnable/Non-returnable).
                            </p>
                        </div>
                    </motion.div>
                </motion.div>

                {/* --- DEEP DIVE SECTIONS --- */}

                {/* 1. For HR Managers */}
                <div className="flex flex-col md:flex-row items-center gap-12 mb-32">
                    <div className="flex-1 space-y-8">
                        <div className="inline-block px-3 py-1 rounded bg-blue-500/10 text-blue-400 font-bold text-xs uppercase tracking-widest">
                            For HR Managers
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black text-white">
                            Command & Control <br /> Your Inventory.
                        </h2>
                        <p className="text-slate-400 text-lg leading-relaxed">
                            Stop using spreadsheets. AssetVerse gives you a powerful dashboard to approve requests, add new assets, and manage your team's needs efficiently.
                        </p>

                        <ul className="space-y-4">
                            <FeatureItem text="Bulk add assets to inventory" />
                            <FeatureItem text="One-click approval workflow" />
                            <FeatureItem text="Automated low-stock alerts" />
                            <FeatureItem text="Employee limit management" />
                        </ul>
                    </div>

                    {/* Visual Placeholder (Glass Card) */}
                    <div className="flex-1 w-full">
                        <div className="relative aspect-video bg-gradient-to-tr from-blue-900 to-slate-800 rounded-3xl border border-slate-700 shadow-2xl p-8 flex items-center justify-center group overflow-hidden">
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
                            <FaClipboardList className="text-9xl text-white/10 group-hover:scale-110 transition-transform duration-500" />
                            <div className="absolute bottom-6 left-6 right-6 bg-slate-900/80 backdrop-blur-md p-4 rounded-xl border border-slate-700">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                    <p className="text-white font-bold text-sm">System Status: Optimal</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. For Employees */}
                <div className="flex flex-col-reverse md:flex-row items-center gap-12 mb-24">
                    {/* Visual Placeholder */}
                    <div className="flex-1 w-full">
                        <div className="relative aspect-video bg-gradient-to-bl from-indigo-900 to-slate-800 rounded-3xl border border-slate-700 shadow-2xl p-8 flex items-center justify-center group overflow-hidden">
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
                            <FaMobileAlt className="text-9xl text-white/10 group-hover:scale-110 transition-transform duration-500" />
                            <div className="absolute top-6 right-6 bg-slate-900/80 backdrop-blur-md px-4 py-2 rounded-lg border border-slate-700">
                                <p className="text-blue-400 font-bold text-xs uppercase">Mobile Ready</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 space-y-8">
                        <div className="inline-block px-3 py-1 rounded bg-indigo-500/10 text-indigo-400 font-bold text-xs uppercase tracking-widest">
                            For Employees
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black text-white">
                            Request what you need, <br /> when you need it.
                        </h2>
                        <p className="text-slate-400 text-lg leading-relaxed">
                            No more email chains. Employees can browse the company catalog, request items, and track their approval status in real-time.
                        </p>

                        <ul className="space-y-4">
                            <FeatureItem text="Instant asset requests" />
                            <FeatureItem text="View personal asset history" />
                            <FeatureItem text="Mobile-friendly dashboard" />
                            <FeatureItem text="Print return receipts" />
                        </ul>
                    </div>
                </div>

                {/* --- BOTTOM CTA --- */}
                <div className="bg-blue-600 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/20 to-transparent pointer-events-none"></div>

                    <h2 className="text-3xl md:text-5xl font-black text-white mb-6 relative z-10">
                        Ready to organize your assets?
                    </h2>
                    <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto relative z-10">
                        Join over 500+ companies streamlining their operations with AssetVerse today.
                    </p>
                    <div className="flex justify-center gap-4 relative z-10">
                        <Link to="/join-hr" className="btn btn-lg bg-white text-blue-600 border-none hover:bg-blue-50 rounded-2xl font-bold shadow-xl">
                            Get Started
                        </Link>
                        <Link to="/contact" className="btn btn-lg btn-outline border-white text-white hover:bg-white/20 hover:border-white rounded-2xl font-bold">
                            Contact Sales
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
};

// Helper for Feature List Items
const FeatureItem = ({ text }) => (
    <div className="flex items-center gap-3">
        <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-blue-500 shrink-0">
            <FaArrowRight size={10} />
        </div>
        <span className="text-slate-300 font-medium">{text}</span>
    </div>
);

export default Features;