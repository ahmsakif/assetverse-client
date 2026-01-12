import React from 'react';
import { FaLaptopCode, FaUsersCog, FaFilePdf, FaClipboardCheck, FaHistory, FaMobileAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const FeaturesShowcase = () => {
    const features = [
        {
            icon: <FaLaptopCode />,
            title: "Real-time Tracking",
            desc: "Monitor asset status, assignment history, and location instantly.",
            color: "text-cyan-400",
            glow: "group-hover:shadow-cyan-500/50"
        },
        {
            icon: <FaUsersCog />,
            title: "Employee Management",
            desc: "Organize your workforce and view their assigned equipment in one click.",
            color: "text-purple-400",
            glow: "group-hover:shadow-purple-500/50"
        },
        {
            icon: <FaClipboardCheck />,
            title: "Easy Requests",
            desc: "Employees can request assets directly through a streamlined portal.",
            color: "text-emerald-400",
            glow: "group-hover:shadow-emerald-500/50"
        },
        {
            icon: <FaFilePdf />,
            title: "Printable Reports",
            desc: "Generate professional PDF reports for audits and inventory checks.",
            color: "text-rose-400",
            glow: "group-hover:shadow-rose-500/50"
        },
        {
            icon: <FaHistory />,
            title: "Return Tracking",
            desc: "Manage returnable vs. non-returnable items with clear logs.",
            color: "text-amber-400",
            glow: "group-hover:shadow-amber-500/50"
        },
        {
            icon: <FaMobileAlt />,
            title: "Mobile Friendly",
            desc: "Fully responsive design allows management on the go from any device.",
            color: "text-indigo-400",
            glow: "group-hover:shadow-indigo-500/50"
        }
    ];

    return (
        <section className="py-24 bg-slate-900 relative">
            
            {/* Visual Separator from previous section */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>

            <div className="container mx-auto px-6 relative z-10">
                
                {/* Section Header */}
                <div className="text-center mb-16 max-w-2xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">
                        Everything You Need
                    </h2>
                    <p className="text-slate-400 text-lg">
                        A unified platform designed to handle the complexity of modern corporate inventory.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, idx) => (
                        <motion.div 
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1, duration: 0.5 }}
                            className="group relative p-6 bg-slate-800/40 rounded-2xl border border-slate-700/50 hover:bg-slate-800 transition-all duration-300"
                        >
                            <div className="flex items-start gap-5">
                                {/* Icon Container */}
                                <div className={`relative flex items-center justify-center w-12 h-12 rounded-xl bg-slate-900 border border-slate-700 ${feature.color} text-2xl transition-all duration-300 shadow-lg ${feature.glow}`}>
                                    {feature.icon}
                                </div>
                                
                                {/* Text Content */}
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-100 transition-colors">
                                        {feature.title}
                                    </h3>
                                    <p className="text-sm text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                                        {feature.desc}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesShowcase;