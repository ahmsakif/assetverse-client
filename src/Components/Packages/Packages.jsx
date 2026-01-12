import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { FaCheck, FaRocket } from 'react-icons/fa';
import useAxios from '../../Hooks/useAxios';

const Packages = () => {
    const axiosInstance = useAxios();
    
    const { data: packages = [] } = useQuery({
        queryKey: ['packages'],
        queryFn: async () => {
            const res = await axiosInstance.get('/packages');
            return res.data.sort((a, b) => a.price - b.price); 
        }
    });

    // Helper to get styles based on package name
    const getCardStyles = (name) => {
        switch (name) {
            case 'Basic':
                return 'bg-slate-800 text-white border border-slate-700'; // Dark Slate Card
            case 'Standard':
                return 'bg-blue-600 text-white shadow-blue-900/50 shadow-xl border border-blue-500'; // Primary Highlight
            case 'Premium':
                return 'bg-white text-slate-900 border border-white'; // High Contrast White
            default:
                return 'bg-slate-800 text-white';
        }
    };

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { 
            opacity: 1, 
            y: 0, 
            transition: { duration: 0.6, type: "spring", stiffness: 50 } 
        }
    };

    return (
        <section className="py-24 bg-slate-900 relative overflow-hidden" id="pricing">
            
            {/* --- TOP FADE BLEND --- */}
            {/* This gradient creates a smooth fade from the Banner's grid into this section */}
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-slate-900 via-slate-900 to-transparent z-10"></div>

            {/* Background Glow Effects */}
            <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-20">
                
                {/* Header */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-slate-800 border border-slate-700 text-blue-400 text-xs font-bold uppercase tracking-widest">
                        Plans & Pricing
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
                        Transparent Pricing
                    </h2>
                    <p className="text-slate-400 text-lg max-w-xl mx-auto font-medium">
                        Simple, predictable pricing for teams of all sizes. No hidden fees or surprise charges.
                    </p>
                </motion.div>

                {/* Pricing Grid */}
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
                >
                    {packages.map((pkg) => {
                        // Determine if this is the highlighted middle card
                        const isStandard = pkg.name === 'Standard';

                        return (
                            <motion.div 
                                key={pkg._id} 
                                variants={cardVariants}
                                className={`relative flex flex-col p-8 rounded-[2rem] transition-all duration-300 hover:-translate-y-2 ${getCardStyles(pkg.name)} ${isStandard ? 'md:-mt-4 md:mb-4 z-10' : ''}`}
                            >
                                {/* Most Popular Badge */}
                                {isStandard && (
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest shadow-lg">
                                        Most Popular
                                    </div>
                                )}

                                {/* Card Header */}
                                <div className="mb-6">
                                    <h3 className="text-xl font-black mb-2">{pkg.name}</h3>
                                    <p className={`text-sm font-medium ${isStandard ? 'text-blue-100' : 'text-slate-400'}`}>
                                        Up to {pkg.employeeLimit} Employees
                                    </p>
                                </div>

                                {/* Price */}
                                <div className="mb-8 flex items-baseline gap-1">
                                    <span className="text-5xl font-black">${pkg.price}</span>
                                    <span className={`text-sm font-bold ${isStandard ? 'text-blue-200' : 'text-slate-500'}`}>/month</span>
                                </div>

                                {/* Features */}
                                <div className="flex-1">
                                    <div className={`h-[1px] w-full mb-6 ${isStandard ? 'bg-blue-500' : 'bg-slate-700'}`}></div>
                                    <ul className="space-y-4 mb-8">
                                        {pkg.features?.map((feature, idx) => (
                                            <li key={idx} className="flex items-start gap-3 text-sm font-bold">
                                                <div className={`mt-0.5 ${isStandard ? 'text-white' : 'text-blue-500'}`}>
                                                    <FaCheck size={14} />
                                                </div>
                                                <span className="leading-tight opacity-90">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* CTA Button */}
                                <button className={`btn w-full rounded-xl border-none font-black h-12 shadow-lg hover:scale-[1.02] transition-transform ${
                                    isStandard 
                                    ? 'bg-white text-blue-600 hover:bg-blue-50' 
                                    : 'bg-blue-600 text-white hover:bg-blue-500'
                                }`}>
                                    {pkg.name === 'Basic' ? 'Start Free' : 'Choose Plan'}
                                </button>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
};

export default Packages;