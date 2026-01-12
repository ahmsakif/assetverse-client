import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import { FaBars, FaTimes, FaSignOutAlt, FaUserCircle, FaThLarge, FaChevronDown } from 'react-icons/fa';
import useAuth from '../../../Hooks/useAuth';
import useRole from '../../../Hooks/useRole';
import LogoFull from '../../Logo/LogoFull'; // Ensure this component handles fill colors or removes fixed colors

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const { user, logOut } = useAuth();
    const [role] = useRole();
    const navigate = useNavigate();

    // 1. Scroll Effect Logic
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogOut = () => {
        logOut().then(() => {
            localStorage.removeItem('access-token');
            navigate('/login');
        });
    };

    // 2. Dynamic Link Styles (Adaptive based on scroll)
    const getLinkClass = ({ isActive }) => {
        const baseStyle = "text-sm font-bold px-5 py-2.5 rounded-full transition-all duration-300";
        
        if (scrolled) {
            // Light Mode Styles (When Scrolled)
            return isActive 
                ? `${baseStyle} bg-primary/10 text-primary` 
                : `${baseStyle} text-slate-600 hover:bg-slate-50 hover:text-slate-900`;
        } else {
            // Dark Mode Styles (At Top)
            return isActive 
                ? `${baseStyle} bg-white/20 text-white backdrop-blur-md` 
                : `${baseStyle} text-white/80 hover:bg-white/10 hover:text-white`;
        }
    };

    // 3. Navigation Links List
    const navLinks = (
        <>
            <li><NavLink to="/" className={getLinkClass}>Home</NavLink></li>
            <li><NavLink to="/pricing" className={getLinkClass}>Pricing</NavLink></li>
            
            {user && (
                <li>
                    <NavLink to="/dashboard" className={getLinkClass}>
                        Dashboard
                    </NavLink>
                </li>
            )}
            
            {!user && (
                <>
                    <li className='hidden xl:block'><span className={`text-xs ${scrolled ? 'text-slate-300' : 'text-white/30'}`}>|</span></li>
                    <li><NavLink to="/join-employee" className={getLinkClass}>Join as Employee</NavLink></li>
                    <li><NavLink to="/join-hr" className={getLinkClass}>Join as HR</NavLink></li>
                </>
            )}
        </>
    );

    return (
        // Wrapper: Fixed to top, handles background transition
        <div className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${
            scrolled 
            ? 'bg-white/80 backdrop-blur-xl shadow-lg border-slate-200/50 py-2' 
            : 'bg-slate-900 border-white/5 py-4'
        }`}>
            {/* Drawer Toggle */}
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
            
            <div className="flex flex-col w-full">
                {/* Navbar Content */}
                <div className="w-full navbar max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* --- LEFT: Hamburger & Logo --- */}
                    <div className="flex-1 flex items-center gap-2">
                        {/* Mobile Toggle Button */}
                        <div className="flex-none lg:hidden">
                            <label 
                                htmlFor="my-drawer-3" 
                                aria-label="open sidebar" 
                                className={`btn btn-square btn-ghost btn-sm ${scrolled ? 'text-slate-800' : 'text-white'}`}
                            >
                                <FaBars size={20} />
                            </label>
                        </div>
                        
                        {/* Logo Area */}
                        <Link to="/" className="flex items-center gap-2 group">
                            {/* Pass a className or fill to LogoFull if it supports it, otherwise wrap it */}
                            <div className={`transition-all duration-300 ${scrolled ? '' : 'brightness-0 invert'}`}> 
                                <LogoFull className="h-8 w-auto" />
                            </div>
                            <span className={`text-xl font-black tracking-tighter transition-colors duration-300 ${scrolled ? 'text-slate-800' : 'text-white'}`}>
                                AssetVerse
                            </span>
                        </Link>
                    </div>

                    {/* --- CENTER: Desktop Menu --- */}
                    <div className="flex-none hidden lg:block">
                        <ul className="flex items-center gap-1">
                            {navLinks}
                        </ul>
                    </div>

                    {/* --- RIGHT: Actions --- */}
                    <div className="flex-none gap-4 ml-4">
                        {user ? (
                            // Logged In State
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className={`btn btn-ghost btn-circle avatar ring-2 ring-offset-2 transition-all ${scrolled ? 'ring-primary ring-offset-white' : 'ring-white/50 ring-offset-transparent'}`}>
                                    <div className="w-10 rounded-full">
                                        <img alt="User" src={user?.photoURL || "https://i.ibb.co/T0x6c6z/profile.png"} />
                                    </div>
                                </div>
                                
                                {/* Dropdown Menu */}
                                <ul tabIndex={0} className="mt-4 z-[1] p-3 shadow-2xl menu menu-sm dropdown-content bg-white rounded-2xl w-64 border border-slate-100">
                                    <li className="px-2 py-3 border-b border-slate-50 mb-2">
                                        <div className="flex flex-col gap-1 items-start">
                                            <span className="text-slate-800 font-bold truncate w-full">{user?.displayName}</span>
                                            <span className="text-xs text-slate-400 font-medium truncate w-full">{user?.email}</span>
                                            <span className={`badge badge-xs mt-1 ${role === 'hr' ? 'badge-primary' : 'badge-secondary'}`}>
                                                {role === 'hr' ? 'HR Manager' : 'Employee'}
                                            </span>
                                        </div>
                                    </li>
                                    <li>
                                        <Link to="/dashboard" className="py-3 font-bold text-slate-600 hover:text-primary hover:bg-primary/5 rounded-xl">
                                            <FaThLarge /> Dashboard
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/profile" className="py-3 font-bold text-slate-600 hover:text-primary hover:bg-primary/5 rounded-xl">
                                            <FaUserCircle /> My Profile
                                        </Link>
                                    </li>
                                    <li className="mt-1">
                                        <button onClick={handleLogOut} className="py-3 font-bold text-rose-500 hover:bg-rose-50 hover:text-rose-600 rounded-xl">
                                            <FaSignOutAlt /> Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            // Logged Out State
                            <Link 
                                to="/login" 
                                className={`btn rounded-xl px-6 font-bold border-none transition-all shadow-md ${
                                    scrolled 
                                    ? 'bg-primary text-white hover:bg-primary-focus hover:-translate-y-0.5' 
                                    : 'bg-white text-slate-900 hover:bg-slate-100 hover:-translate-y-0.5'
                                }`}
                            >
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            {/* --- MOBILE DRAWER --- */}
            <div className="drawer-side z-50">
                <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label> 
                <ul className="menu p-6 w-80 min-h-full bg-white text-base-content relative">
                    {/* Close Btn */}
                    <div className="absolute top-4 right-4">
                         <label htmlFor="my-drawer-3" className="btn btn-circle btn-ghost btn-sm text-slate-400">
                            <FaTimes size={20} />
                         </label>
                    </div>
                    
                    {/* Drawer Header */}
                    <div className="mb-8 mt-2">
                         <h2 className="text-2xl font-black text-slate-800 tracking-tight">AssetVerse</h2>
                         <p className="text-sm text-slate-400 font-medium">Navigation</p>
                    </div>

                    {/* Mobile Links */}
                    <div className="space-y-2">
                        <li><NavLink to="/" className="font-bold text-slate-600 py-3 text-base">Home</NavLink></li>
                        <li><NavLink to="/pricing" className="font-bold text-slate-600 py-3 text-base">Pricing</NavLink></li>
                        
                        <div className="divider my-4"></div>

                        {user ? (
                             <>
                                <li><NavLink to="/dashboard" className="font-bold text-slate-600 py-3 text-base"><FaThLarge /> Dashboard</NavLink></li>
                                <li><NavLink to="/profile" className="font-bold text-slate-600 py-3 text-base"><FaUserCircle /> My Profile</NavLink></li>
                                <li className="mt-4">
                                    <button onClick={handleLogOut} className="btn btn-error btn-outline btn-sm w-full rounded-xl">Logout</button>
                                </li>
                             </>
                        ) : (
                             <div className="flex flex-col gap-3">
                                <li><NavLink to="/join-employee" className="font-bold text-slate-600 py-3 border border-slate-100 rounded-xl justify-center">Join as Employee</NavLink></li>
                                <li><NavLink to="/join-hr" className="font-bold text-slate-600 py-3 border border-slate-100 rounded-xl justify-center">Join as HR</NavLink></li>
                                <Link to="/login" className="btn btn-primary w-full rounded-xl mt-2">Login</Link>
                             </div>
                        )}
                    </div>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;