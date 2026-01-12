import React from 'react';
import { FaFacebook, FaInstagram, FaLinkedinIn, FaGithub } from 'react-icons/fa';
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
import { Link } from 'react-router'; 
import LogoFull from '../../Logo/LogoFull';

const Footer = () => {

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="relative bg-slate-950 border-t border-slate-900 pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                
                {/* --- BRAND COLUMN --- */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center gap-3">
                        {/* Ensure LogoFull can take a fill class or wrap it */}
                        <div className="brightness-0 invert opacity-90"> 
                            <LogoFull className="h-8 w-auto" />
                        </div>
                        <h2 className="text-white font-black text-2xl tracking-tighter">AssetVerse</h2>
                    </div>
                    
                    <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                        Simplifying asset tracking for modern teams. We help businesses manage equipment, track assignments, and reduce loss with one intuitive platform.
                    </p>

                    {/* Socials */}
                    <div className="flex gap-4">
                        <SocialLink href="https://github.com/bitvotion" icon={<FaGithub />} />
                        <SocialLink href="https://www.linkedin.com/in/sakif-ahmed-9b50881a9/" icon={<FaLinkedinIn />} />
                        <SocialLink href="https://www.instagram.com/_ddhrubb_/" icon={<FaInstagram />} />
                        <SocialLink href="https://www.facebook.com/ahm.sakif24/" icon={<FaFacebook />} />
                    </div>
                </div>

                {/* --- LINKS COLUMN 1 --- */}
                <div>
                    <h3 className="text-white font-bold mb-6">Product</h3>
                    <ul className="space-y-4 text-sm text-slate-400">
                        <li><Link to="/features" className="hover:text-white transition-colors">Features</Link></li>
                        <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                        <li><Link to="/join-employee" className="hover:text-white transition-colors">For Employees</Link></li>
                        <li><Link to="/join-hr" className="hover:text-white transition-colors">For HR Managers</Link></li>
                    </ul>
                </div>

                {/* --- LINKS COLUMN 2 --- */}
                <div>
                    <h3 className="text-white font-bold mb-6">Company</h3>
                    <ul className="space-y-4 text-sm text-slate-400">
                        <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                        <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                        <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                        <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                        <li><Link to="/support" className="hover:text-white transition-colors">Support</Link></li>
                    </ul>
                </div>
            </div>

            {/* --- BOTTOM BAR --- */}
            <div className="max-w-7xl mx-auto px-6 border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-slate-500 text-xs font-medium">
                    &copy; {new Date().getFullYear()} AssetVerse Inc. All rights reserved.
                </p>
                
                <button 
                    onClick={scrollToTop} 
                    className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors uppercase tracking-widest"
                >
                    Back to Top <MdKeyboardDoubleArrowUp size={16} />
                </button>
            </div>
        </footer>
    );
};

// Helper Component for Social Icons
const SocialLink = ({ href, icon }) => (
    <a 
        href={href} 
        target="_blank" 
        rel="noreferrer" 
        className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:bg-white hover:text-slate-950 transition-all duration-300"
    >
        {icon}
    </a>
);

export default Footer; 