import React from 'react';
import { Link } from 'react-router';
import { FaUserTie, FaUsers } from 'react-icons/fa';

const JoinAs = () => {
    return (
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center bg-white min-h-screen lg:rounded-r-[80px] relative z-10 shadow-2xl animate-in slide-in-from-left duration-700">
            
            <div className="w-full max-w-[480px] px-8 py-10 flex flex-col h-full justify-center">
                
                {/* --- HEADER --- */}
                <div className="mb-10 text-center">
                    <h1 className="text-4xl font-black text-slate-800 tracking-tight mb-3">
                        Choose Account Type
                    </h1>
                    <p className="text-slate-500 font-medium">
                        Select how you want to use AssetVerse to get started.
                    </p>
                </div>

                {/* --- CHOICE CARDS --- */}
                <div className="space-y-4">
                    
                    {/* Employee Card */}
                    <Link to="/join-employee" className="group relative block p-6 rounded-[2rem] border-2 border-slate-100 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 bg-slate-50 hover:bg-white transition-all duration-300 transform hover:-translate-y-1">
                        <div className="flex items-center gap-5">
                            <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-primary shadow-sm group-hover:scale-110 transition-transform">
                                <FaUserTie size={24} />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-black text-slate-800 mb-1 group-hover:text-primary transition-colors">
                                    Join as Employee
                                </h3>
                                <p className="text-xs font-bold text-slate-400 leading-relaxed">
                                    Request assets, track approvals, and manage your profile.
                                </p>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                                <span className="text-lg font-bold">→</span>
                            </div>
                        </div>
                    </Link>

                    {/* HR Manager Card */}
                    <Link to="/join-hr" className="group relative block p-6 rounded-[2rem] border-2 border-slate-100 hover:border-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/5 bg-slate-50 hover:bg-white transition-all duration-300 transform hover:-translate-y-1">
                        <div className="flex items-center gap-5">
                            <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-indigo-600 shadow-sm group-hover:scale-110 transition-transform">
                                <FaUsers size={24} />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-black text-slate-800 mb-1 group-hover:text-indigo-600 transition-colors">
                                    Join as HR Manager
                                </h3>
                                <p className="text-xs font-bold text-slate-400 leading-relaxed">
                                    Manage team inventory, approve requests, and add employees.
                                </p>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                <span className="text-lg font-bold">→</span>
                            </div>
                        </div>
                    </Link>

                </div>

                {/* --- FOOTER --- */}
                <div className="text-center mt-12 pt-8 border-t border-slate-50">
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

export default JoinAs;