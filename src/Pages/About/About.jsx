import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const About = () => {
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const team = [
        { name: "Alex Morgan", role: "CEO & Founder", img: "https://i.pravatar.cc/150?u=a042581f4e29026024d" },
        { name: "Sarah Connor", role: "CTO", img: "https://i.pravatar.cc/150?u=a042581f4e29026704d" },
        { name: "James Bond", role: "Head of Security", img: "https://i.pravatar.cc/150?u=a04258114e29026302d" },
        { name: "Ellen Ripley", role: "Product Manager", img: "https://i.pravatar.cc/150?u=a04258114e29026702d" },
    ];

    return (
        <div className="min-h-screen bg-slate-950 pt-20 pb-20 mt-24">
            
            {/* --- HERO SECTION --- */}
            <section className="relative container mx-auto px-6 mb-24 text-center">
                <div className="absolute inset-0 bg-blue-500/5 blur-3xl rounded-full -z-10 transform scale-75"></div>
                
                <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">
                    We organize the <br /> <span className="text-blue-500">world's assets.</span>
                </h1>
                <p className="text-slate-400 text-xl max-w-3xl mx-auto leading-relaxed">
                    AssetVerse was founded on a simple belief: managing corporate inventory shouldn't be a nightmare. We build software that gives HR and IT teams superpowers.
                </p>
            </section>

            {/* --- STATS --- */}
            <section className="border-y border-slate-800 bg-slate-900/30 mb-24">
                <div className="container mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    <StatItem value="2025" label="Founded" />
                    <StatItem value="50M+" label="Assets Tracked" />
                    <StatItem value="10k+" label="Companies" />
                    <StatItem value="99.9%" label="Uptime" />
                </div>
            </section>

            {/* --- TEAM SECTION --- */}
            <section className="container mx-auto px-6 max-w-6xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-black text-white mb-4">Meet the Team</h2>
                    <p className="text-slate-400">The minds behind the platform.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {team.map((member, idx) => (
                        <motion.div 
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="group bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center hover:border-blue-500/30 transition-all"
                        >
                            <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-2 border-slate-700 mb-4 group-hover:border-blue-500 transition-colors">
                                <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
                            </div>
                            <h3 className="text-white font-bold text-lg">{member.name}</h3>
                            <p className="text-blue-400 text-sm font-medium">{member.role}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

        </div>
    );
};

const StatItem = ({ value, label }) => (
    <div>
        <p className="text-4xl font-black text-white mb-1">{value}</p>
        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">{label}</p>
    </div>
);

export default About;