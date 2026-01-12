import React from 'react';
import { FaUserTie, FaUser } from 'react-icons/fa';
import toast from 'react-hot-toast';

const DemoLogin = ({ setValue }) => {
    
    const handleFill = (role) => {
        if (role === 'hr') {
            setValue("email", "admin@bitvotion.com"); 
            setValue("password", "Sakif3124");
            toast.success("HR Credentials Applied!");
        } else {
            setValue("email", "employee@bitvotion.com");
            setValue("password", "Sakif3124");
            toast.success("Employee Credentials Applied!");
        }
    };

    return (
        <div className="flex flex-col gap-3 mt-6">
            <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-slate-200"></div>
                <span className="flex-shrink-0 mx-4 text-slate-400 text-xs font-bold uppercase tracking-widest">Quick Demo Access</span>
                <div className="flex-grow border-t border-slate-200"></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <button 
                    type="button"
                    onClick={() => handleFill('hr')}
                    className="flex items-center justify-center gap-2 p-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-indigo-500 hover:text-indigo-600 hover:shadow-md transition-all duration-300 group"
                >
                    <div className="p-1.5 bg-white rounded-lg border border-slate-200 group-hover:border-indigo-200 text-slate-400 group-hover:text-indigo-500 transition-colors">
                        <FaUserTie />
                    </div>
                    <div className="text-left">
                        <p className="text-xs font-bold text-slate-700 group-hover:text-indigo-700">HR Manager</p>
                    </div>
                </button>

                <button 
                    type="button"
                    onClick={() => handleFill('employee')}
                    className="flex items-center justify-center gap-2 p-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-blue-500 hover:text-blue-600 hover:shadow-md transition-all duration-300 group"
                >
                    <div className="p-1.5 bg-white rounded-lg border border-slate-200 group-hover:border-blue-200 text-slate-400 group-hover:text-blue-500 transition-colors">
                        <FaUser />
                    </div>
                    <div className="text-left">
                        <p className="text-xs font-bold text-slate-700 group-hover:text-blue-700">Employee</p>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default DemoLogin;