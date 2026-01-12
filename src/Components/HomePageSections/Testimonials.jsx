import React from 'react';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Testimonials = () => {
    const stats = [
        { id: 1, value: "500+", label: "Companies" },
        { id: 2, value: "12k+", label: "Assets Tracked" },
        { id: 3, value: "98%", label: "Satisfaction" },
        { id: 4, value: "24/7", label: "Support" },
    ];

    const reviews = [
        {
            id: 1,
            name: "Sarah Johnson",
            role: "HR Manager, TechFlow",
            image: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
            text: "AssetVerse completely transformed how we handle our inventory. No more lost laptops or confusion about who has what. Highly recommended!",
            rating: 5
        },
        {
            id: 2,
            name: "Michael Chen",
            role: "Ops Director, GreenCorp",
            image: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
            text: "The employee request flow is seamless. It saved my team hours of manual work every week. The best investment we made this year.",
            rating: 5
        },
        {
            id: 3,
            name: "Emily Davis",
            role: "Admin Lead, StartUp Inc",
            image: "https://i.pravatar.cc/150?u=a04258114e29026302d",
            text: "Simple, intuitive, and effective. The return tracking feature ensures we get our equipment back when employees leave.",
            rating: 4
        }
    ];

    return (
        <section className="py-24 bg-slate-900 border-t border-slate-800 relative">
            
            {/* Background Glow */}
            <div className="absolute bottom-0 left-0 w-[600px] h-[400px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10">
                
                {/* --- STATS DASHBOARD --- */}
                <div className="bg-slate-800/50 rounded-3xl p-8 md:p-12 mb-24 border border-slate-700/50 backdrop-blur-md">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, idx) => (
                            <motion.div 
                                key={stat.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.1 }}
                                className="text-center md:border-r border-slate-700 last:border-none"
                            >
                                <h3 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tighter">
                                    {stat.value}
                                </h3>
                                <p className="text-blue-400 font-bold uppercase tracking-widest text-xs">
                                    {stat.label}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* --- TESTIMONIALS HEADER --- */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">
                        Trusted by Industry Leaders
                    </h2>
                    <p className="text-slate-400 text-lg max-w-xl mx-auto">
                        See what HR managers and admins are saying about their experience with AssetVerse.
                    </p>
                </div>

                {/* --- REVIEWS GRID --- */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {reviews.map((review, idx) => (
                        <motion.div 
                            key={review.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1, duration: 0.6 }}
                            className="relative bg-slate-800 rounded-3xl p-8 border border-slate-700 hover:border-blue-500/30 transition-all duration-300"
                        >
                            {/* Quote Icon */}
                            <div className="absolute top-8 right-8 text-slate-700 opacity-50">
                                <FaQuoteLeft size={40} />
                            </div>

                            {/* Stars */}
                            <div className="flex gap-1 mb-6 text-amber-400">
                                {[...Array(5)].map((_, i) => (
                                    <FaStar key={i} className={i < review.rating ? "opacity-100" : "opacity-20 text-slate-500"} size={14} />
                                ))}
                            </div>

                            {/* Text */}
                            <p className="text-slate-300 text-base leading-relaxed mb-8 relative z-10">
                                "{review.text}"
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-4 mt-auto">
                                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-slate-600">
                                    <img src={review.image} alt={review.name} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-sm">{review.name}</h4>
                                    <p className="text-blue-400 text-xs font-bold uppercase tracking-wide">{review.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;