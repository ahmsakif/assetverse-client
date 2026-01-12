import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaQuestionCircle, FaBuilding, FaArrowRight, FaPhoneAlt } from 'react-icons/fa';
import { Link } from 'react-router';
import Packages from '../../Components/Packages/Packages';




const Pricing = () => {
    
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-slate-950">
            
            {/* 1. MAIN PACKAGES SECTION (Reused) */}
            {/* We add pt-20 to account for the fixed navbar overlay */}
            <div className="pt-20">
                <Packages />
            </div>

            {/* 2. ENTERPRISE CTA SECTION */}
            <section className="py-20 bg-slate-900 border-y border-slate-800 relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-[100px] pointer-events-none"></div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="bg-gradient-to-r from-blue-900/40 to-slate-800/40 border border-blue-500/20 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 backdrop-blur-sm">
                        
                        <div className="flex-1 space-y-4 text-center md:text-left">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest">
                                <FaBuilding /> Enterprise
                            </div>
                            <h2 className="text-3xl md:text-4xl font-black text-white">
                                Need more than 20 employees?
                            </h2>
                            <p className="text-slate-400 text-lg max-w-xl">
                                We offer custom plans for large organizations. Get unlimited seats, dedicated support manager, and SSO integration.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link to="/contact" className="btn btn-lg bg-white text-slate-900 hover:bg-blue-50 border-none rounded-xl font-bold shadow-xl shadow-white/5">
                                Contact Sales <FaArrowRight />
                            </Link>
                            <Link to="/contact" className="btn btn-lg btn-outline border-slate-600 text-white hover:bg-slate-800 hover:border-slate-500 rounded-xl font-bold">
                                <FaPhoneAlt className="mr-2" /> Book Demo
                            </Link>
                        </div>

                    </div>
                </div>
            </section>

            {/* 3. DETAILED FAQ SECTION */}
            <section className="py-24 bg-slate-950">
                <div className="container mx-auto px-6 max-w-4xl">
                    
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl font-black text-white mb-4 tracking-tight">Frequently Asked Questions</h2>
                        <p className="text-slate-400">Everything you need to know about billing and subscriptions.</p>
                    </motion.div>

                    <div className="space-y-4">
                        <FAQItem 
                            question="Can I upgrade my plan later?" 
                            answer="Absolutely. You can upgrade your employee limit instantly from your HR Dashboard. The payment will be pro-rated for the remainder of your billing cycle."
                        />
                        <FAQItem 
                            question="Is the 'Basic' plan really free forever?" 
                            answer="Yes! If you have 5 or fewer employees, AssetVerse is completely free. You get full access to asset tracking features without adding a credit card."
                        />
                        <FAQItem 
                            question="What happens if I reach my employee limit?" 
                            answer="You won't be able to add new employees until you upgrade to the next tier. We will send you a notification when you are approaching your limit."
                        />
                        <FAQItem 
                            question="Do you offer discounts for non-profits?" 
                            answer="Yes, we support organizations making a difference. Contact our sales team with your documentation to receive a 50% discount on all paid plans."
                        />
                        <FAQItem 
                            question="How secure is my data?" 
                            answer="We use bank-grade AES-256 encryption for all data. Payments are processed securely via Stripe, and we do not store your credit card information."
                        />
                    </div>

                </div>
            </section>
        </div>
    );
};

// Helper Component for Glassmorphism Accordion
const FAQItem = ({ question, answer }) => {
    return (
        <div className="collapse collapse-plus bg-slate-900 border border-slate-800 rounded-2xl group transition-all duration-300 hover:border-blue-500/30">
            <input type="radio" name="pricing-faq" /> 
            <div className="collapse-title text-lg font-bold text-white group-hover:text-blue-400 transition-colors py-6 flex items-center gap-3">
                <FaQuestionCircle className="text-slate-600 group-hover:text-blue-500 transition-colors text-xl" />
                {question}
            </div>
            <div className="collapse-content"> 
                <p className="text-slate-400 pb-6 pl-10 leading-relaxed text-sm md:text-base">
                    {answer}
                </p>
            </div>
        </div>
    );
};

export default Pricing;