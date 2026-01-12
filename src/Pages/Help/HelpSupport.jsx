import React, { useEffect } from 'react';
import { Link } from 'react-router';
import { FaSearch, FaBook, FaUserCog, FaCreditCard, FaLock, FaHeadset } from 'react-icons/fa';
import { motion } from 'framer-motion';

const HelpSupport = () => {
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const categories = [
        { icon: <FaBook />, title: "Getting Started", desc: "Setting up your workspace for the first time." },
        { icon: <FaUserCog />, title: "Account Settings", desc: "Managing profiles, passwords, and notifications." },
        { icon: <FaCreditCard />, title: "Billing & Plans", desc: "Invoices, upgrades, and payment methods." },
        { icon: <FaLock />, title: "Security", desc: "2FA, SSO, and data protection policies." },
    ];

    return (
        <div className="min-h-screen bg-slate-950 pt-20 pb-20">
            
            {/* --- HERO SEARCH --- */}
            <div className="bg-slate-900 border-b border-slate-800 py-20 mb-20">
                <div className="container mx-auto px-6 text-center max-w-3xl">
                    <p className="text-blue-500 font-bold uppercase tracking-widest text-xs mb-4">Help Center</p>
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-8">How can we help you?</h1>
                    
                    <div className="relative">
                        <FaSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 text-xl" />
                        <input 
                            type="text" 
                            placeholder="Search for articles (e.g., 'How to add asset')..." 
                            className="w-full h-16 pl-16 pr-6 rounded-2xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-lg shadow-2xl"
                        />
                    </div>
                </div>
            </div>

            {/* --- CATEGORIES --- */}
            <div className="container mx-auto px-6 max-w-5xl mb-24">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {categories.map((cat, idx) => (
                        <motion.div 
                            key={idx}
                            whileHover={{ y: -4 }}
                            className="bg-slate-900 border border-slate-800 p-8 rounded-2xl hover:border-blue-500/30 cursor-pointer group transition-all"
                        >
                            <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center text-blue-400 text-xl mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                {cat.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{cat.title}</h3>
                            <p className="text-slate-400">{cat.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* --- CONTACT CTA --- */}
            <div className="container mx-auto px-6 max-w-4xl text-center">
                <div className="bg-gradient-to-r from-blue-900/20 to-indigo-900/20 border border-blue-500/20 rounded-3xl p-12">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-6 shadow-lg shadow-blue-600/30">
                        <FaHeadset />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-4">Still need help?</h2>
                    <p className="text-slate-400 mb-8 max-w-lg mx-auto">
                        Our support team is available 24/7 to assist you with any issues you might be facing.
                    </p>
                    <Link to="/contact" className="btn btn-primary px-8 rounded-xl font-bold">
                        Contact Support
                    </Link>
                </div>
            </div>

        </div>
    );
};

export default HelpSupport;