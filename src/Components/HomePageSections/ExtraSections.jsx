import React from 'react';
import { Link } from 'react-router';
import { FaUserPlus, FaSearch, FaCheckCircle, FaArrowRight, FaQuestionCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ExtraSections = () => {
    return (
        <div className="bg-slate-900 overflow-hidden">
            
            {/* --- SECTION A: HOW IT WORKS --- */}
            <section className="py-24 relative">
                {/* Background Line Pattern */}
                <div className="absolute inset-0 opacity-5 bg-[linear-gradient(45deg,#ffffff_1px,transparent_1px)] [background-size:20px_20px]"></div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">How It Works</h2>
                        <p className="text-slate-400 text-lg">Get up and running in minutes.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-blue-900 via-blue-500 to-blue-900 opacity-30 -z-10"></div>

                        {/* Step 1 */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="flex flex-col items-center text-center group"
                        >
                            <div className="w-24 h-24 rounded-full bg-slate-800 border-4 border-slate-700 flex items-center justify-center mb-6 group-hover:border-blue-500 transition-colors duration-300 shadow-xl shadow-black/20">
                                <FaUserPlus className="text-3xl text-blue-400" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">1. Create Account</h3>
                            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                                Register as an HR Manager to set up your company workspace or join as an Employee.
                            </p>
                        </motion.div>

                        {/* Step 2 */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="flex flex-col items-center text-center group"
                        >
                            <div className="w-24 h-24 rounded-full bg-slate-800 border-4 border-slate-700 flex items-center justify-center mb-6 group-hover:border-purple-500 transition-colors duration-300 shadow-xl shadow-black/20">
                                <FaSearch className="text-3xl text-purple-400" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">2. Request Assets</h3>
                            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                                Browse the digital inventory catalog and request the equipment you need instantly.
                            </p>
                        </motion.div>

                        {/* Step 3 */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="flex flex-col items-center text-center group"
                        >
                            <div className="w-24 h-24 rounded-full bg-slate-800 border-4 border-slate-700 flex items-center justify-center mb-6 group-hover:border-emerald-500 transition-colors duration-300 shadow-xl shadow-black/20">
                                <FaCheckCircle className="text-3xl text-emerald-400" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">3. Approve & Track</h3>
                            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                                HR approves requests with one click. AssetVerse handles the tracking automatically.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* --- SECTION B: FAQ --- */}
            <section className="py-24 bg-slate-800/30 border-y border-slate-800">
                <div className="container mx-auto px-6 max-w-3xl">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-800 text-slate-400 mb-4">
                            <FaQuestionCircle size={20} />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">Common Questions</h2>
                    </div>
                    
                    <div className="space-y-4">
                        {/* Question 1 */}
                        <div className="collapse collapse-plus bg-slate-800 border border-slate-700 rounded-2xl group">
                            <input type="radio" name="faq-accordion" defaultChecked /> 
                            <div className="collapse-title text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                                Is AssetVerse free for startups?
                            </div>
                            <div className="collapse-content text-slate-400">
                                <p>Yes! Our "Basic" package allows you to manage up to 5 employees and unlimited assets completely free of charge forever.</p>
                            </div>
                        </div>

                        {/* Question 2 */}
                        <div className="collapse collapse-plus bg-slate-800 border border-slate-700 rounded-2xl group">
                            <input type="radio" name="faq-accordion" /> 
                            <div className="collapse-title text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                                Can an employee belong to multiple companies?
                            </div>
                            <div className="collapse-content text-slate-400">
                                <p>Absolutely. AssetVerse supports multi-tenant accounts. An employee can request assets from different companies using a single login.</p>
                            </div>
                        </div>

                        {/* Question 3 */}
                        <div className="collapse collapse-plus bg-slate-800 border border-slate-700 rounded-2xl group">
                            <input type="radio" name="faq-accordion" /> 
                            <div className="collapse-title text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                                How do I upgrade my employee limit?
                            </div>
                            <div className="collapse-content text-slate-400">
                                <p>HR Managers can upgrade their package instantly via the "Packages" tab in the dashboard. We use Stripe for secure, pro-rated billing.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- SECTION C: CTA --- */}
            <section className="py-24 relative overflow-hidden">
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-10"></div>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/40 via-slate-900 to-slate-900"></div>

                <div className="container mx-auto px-6 text-center relative z-10">
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
                        Ready to Organize Your Assets?
                    </h2>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10">
                        Join over 500+ forward-thinking companies streamlining their operations with AssetVerse today.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link to="/join-hr" className="btn btn-lg bg-white text-blue-900 hover:bg-blue-50 border-none rounded-2xl px-10 font-black shadow-xl shadow-blue-900/20 hover:-translate-y-1 transition-all">
                            Get Started Now
                        </Link>
                        <Link to="/contact" className="btn btn-lg bg-transparent text-white border-slate-600 hover:bg-slate-800 hover:border-slate-500 rounded-2xl px-10 font-bold transition-all">
                            Contact Sales
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ExtraSections;