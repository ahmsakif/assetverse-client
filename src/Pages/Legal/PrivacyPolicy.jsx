import React, { useEffect } from 'react';
import { Link } from 'react-router';
import { FaArrowLeft, FaShieldAlt } from 'react-icons/fa';

const PrivacyPolicy = () => {
    
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
                        <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400">
                            <FaShieldAlt size={24} />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">Privacy Policy</h1>
                    </div>
                    <p className="text-slate-400 text-lg">
                        Your privacy is critically important to us. This policy explains how AssetVerse collects, uses, and protects your data.
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
                
                {/* Sidebar (Date) */}
                <div className="md:col-span-1">
                    <div className="sticky top-10">
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Last Updated</p>
                        <p className="text-white font-bold">January 12, 2026</p>
                        <div className="h-1 w-10 bg-blue-600 mt-4 rounded-full"></div>
                    </div>
                </div>

                {/* Legal Text */}
                <div className="md:col-span-3 space-y-12">
                    
                    <Section title="1. Information We Collect">
                        <p>
                            We collect information you provide directly to us when you create an account, request assets, or communicate with us. This includes:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 mt-4 text-slate-400">
                            <li><strong className="text-white">Account Information:</strong> Name, email address, password, and company affiliation.</li>
                            <li><strong className="text-white">Usage Data:</strong> Information about how you use our dashboard, features accessed, and time spent.</li>
                            <li><strong className="text-white">Asset Data:</strong> Details about the equipment you add, request, or manage within the system.</li>
                        </ul>
                    </Section>

                    <Section title="2. How We Use Your Data">
                        <p>
                            We use the collected data to operate, maintain, and improve AssetVerse. Specifically, we use it to:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 mt-4 text-slate-400">
                            <li>Process asset requests and approvals.</li>
                            <li>Send administrative information, such as security alerts and billing updates.</li>
                            <li>Monitor and analyze trends, usage, and activities in connection with our services.</li>
                            <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities.</li>
                        </ul>
                    </Section>

                    <Section title="3. Data Security">
                        <p>
                            We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction.
                        </p>
                        <p className="mt-4">
                            We use <strong className="text-white">AES-256 encryption</strong> for all sensitive data stored in our databases, and all data in transit is protected via SSL/TLS.
                        </p>
                    </Section>

                    <Section title="4. Sharing of Information">
                        <p>
                            We do not share your personal information with third parties except as described in this privacy policy:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 mt-4 text-slate-400">
                            <li>With your consent or at your direction.</li>
                            <li>With third-party vendors and other service providers who need access to such information to carry out work on our behalf (e.g., Stripe for payments).</li>
                            <li>In response to a request for information if we believe disclosure is in accordance with any applicable law, regulation, or legal process.</li>
                        </ul>
                    </Section>

                    <Section title="5. Your Rights">
                        <p>
                            You have the right to access, correct, or delete your personal information. You can manage your account settings directly within the Dashboard or contact our support team for assistance with data deletion requests.
                        </p>
                    </Section>

                    {/* Footer Contact */}
                    <div className="pt-8 border-t border-slate-800">
                        <p className="text-slate-400">
                            Have questions about this policy? <Link to="/contact" className="text-blue-400 hover:underline">Contact Support</Link>
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
};

// Helper for Sections
const Section = ({ title, children }) => (
    <section>
        <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
        <div className="text-slate-400 leading-relaxed text-lg">
            {children}
        </div>
    </section>
);

export default PrivacyPolicy;