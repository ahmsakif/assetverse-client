import React, { useEffect } from 'react';
import { Link } from 'react-router';
import { FaArrowLeft, FaFileContract } from 'react-icons/fa';

const TermsOfService = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-slate-950 text-slate-300 font-sans mt-24">
            
            {/* Header */}
            <div className="bg-slate-900 border-b border-slate-800">
                <div className="max-w-4xl mx-auto px-6 py-12">
                    <Link to="/" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-bold text-sm mb-6 transition-colors">
                        <FaArrowLeft /> Back to Home
                    </Link>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-400">
                            <FaFileContract size={24} />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">Terms of Service</h1>
                    </div>
                    <p className="text-slate-400 text-lg">
                        Please read these terms carefully before using the AssetVerse platform.
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
                
                {/* Sidebar (Date) */}
                <div className="md:col-span-1">
                    <div className="sticky top-10">
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Effective Date</p>
                        <p className="text-white font-bold">January 12, 2026</p>
                        <div className="h-1 w-10 bg-indigo-600 mt-4 rounded-full"></div>
                    </div>
                </div>

                {/* Legal Text */}
                <div className="md:col-span-3 space-y-12">
                    
                    <Section title="1. Acceptance of Terms">
                        <p>
                            By accessing or using AssetVerse, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.
                        </p>
                    </Section>

                    <Section title="2. Accounts">
                        <p>
                            When you create an account with us, you must provide us with information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
                        </p>
                        <p className="mt-4">
                            You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password.
                        </p>
                    </Section>

                    <Section title="3. Use License">
                        <p>
                            AssetVerse grants you a personal, non-transferable, non-exclusive license to use the software for your internal business purposes in connection with the Service.
                        </p>
                        <ul className="list-disc pl-5 space-y-2 mt-4 text-slate-400">
                            <li>You may not copy, modify, or distribute the software.</li>
                            <li>You may not reverse engineer, decompile, or disassemble the software.</li>
                            <li>You may not use the Service for any illegal or unauthorized purpose.</li>
                        </ul>
                    </Section>

                    <Section title="4. Subscription & Payments">
                        <p>
                            Some parts of the Service are billed on a subscription basis ("Subscription(s)"). You will be billed in advance on a recurring and periodic basis (such as monthly or annually).
                        </p>
                        <p className="mt-4">
                            You can cancel your subscription at any time. Your access to paid features will continue until the end of your current billing period.
                        </p>
                    </Section>

                    <Section title="5. Termination">
                        <p>
                            We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                        </p>
                        <p className="mt-4">
                            All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of liability.
                        </p>
                    </Section>

                    <Section title="6. Limitation of Liability">
                        <p>
                            In no event shall AssetVerse, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
                        </p>
                    </Section>

                    {/* Footer Contact */}
                    <div className="pt-8 border-t border-slate-800">
                        <p className="text-slate-400">
                            Questions regarding these Terms? <Link to="/contact" className="text-indigo-400 hover:underline">Contact Legal</Link>
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
};

// Reuse Helper
const Section = ({ title, children }) => (
    <section>
        <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
        <div className="text-slate-400 leading-relaxed text-lg">
            {children}
        </div>
    </section>
);

export default TermsOfService;