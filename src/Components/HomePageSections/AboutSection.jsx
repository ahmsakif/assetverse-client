import React from 'react';
import { FaBoxes, FaUserShield, FaChartLine, FaClock } from 'react-icons/fa';
import { motion } from 'framer-motion';

const AboutSection = () => {
    const benefits = [
        {
            id: 1,
            icon: <FaBoxes size={28} />,
            title: "Total Asset Visibility",
            description: "Stop losing track of valuable equipment. Monitor every laptop, chair, and keyboard in real-time.",
            color: "text-blue-400",
            bg: "bg-blue-500/10"
        },
        {
            id: 2,
            icon: <FaUserShield size={28} />,
            title: "Employee Accountability",
            description: "Ensure every asset is assigned to a specific employee. Reduce loss and improve corporate responsibility.",
            color: "text-emerald-400",
            bg: "bg-emerald-500/10"
        },
        {
            id: 3,
            icon: <FaChartLine size={28} />,
            title: "Cost Optimization",
            description: "Identify underutilized assets and make smarter purchasing decisions based on actual usage data.",
            color: "text-purple-400",
            bg: "bg-purple-500/10"
        },
        {
            id: 4,
            icon: <FaClock size={28} />,
            title: "Time Saving Automation",
            description: "Automate check-ins and check-outs. Save HR teams hours of manual spreadsheet updates every week.",
            color: "text-amber-400",
            bg: "bg-amber-500/10"
        }
    ];

    return (
        <section className="py-24 bg-slate-900 relative border-t border-slate-800">
            
            {/* Background Gradient Spot */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10">
                
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs font-bold uppercase tracking-widest mb-4">
                        <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                        Why AssetVerse
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
                        Built for Modern <br /> 
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                            Asset Management
                        </span>
                    </h2>
                    <p className="text-slate-400 text-lg font-medium leading-relaxed">
                        We streamline the complex process of corporate inventory, helping you focus on growing your business while we handle the logistics.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1440px] px-8 mx-auto">
                    {benefits.map((benefit, index) => (
                        <motion.div 
                            key={benefit.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="group p-8 rounded-[2rem] bg-slate-800/50 border border-slate-700 hover:border-blue-500/30 hover:bg-slate-800 transition-all duration-300 hover:-translate-y-1"
                        >
                            {/* Icon Box */}
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${benefit.bg} ${benefit.color}`}>
                                {benefit.icon}
                            </div>
                            
                            {/* Content */}
                            <h3 className="text-xl font-black text-white mb-3 leading-tight group-hover:text-blue-100 transition-colors">
                                {benefit.title}
                            </h3>
                            <p className="text-slate-400 text-sm font-medium leading-relaxed">
                                {benefit.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AboutSection;