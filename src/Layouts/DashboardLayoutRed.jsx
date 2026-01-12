import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate, Link } from 'react-router';
import { 
    FaHome, FaBox, FaUsers, FaSignOutAlt, FaBars, FaCrown, 
    FaHistory, FaUserCircle, FaChevronRight, FaChevronLeft, FaSearch, FaBell 
} from 'react-icons/fa';
import { TbCubePlus, TbDevicesPlus } from "react-icons/tb";
import { MdInventory, MdOutlineHistoryEdu } from 'react-icons/md';

import useRole from '../Hooks/useRole';
import useAuth from '../Hooks/useAuth';
import LogoFull from '../Components/Logo/LogoFull';
import LimitWarning from '../Utilities/LimitWarning';

const DashboardLayoutRed = () => {
    const { user, signOutUser } = useAuth();
    const [role, isRoleLoading] = useRole();
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const handleLogOut = () => {
        signOutUser().then(() => {
            localStorage.removeItem('access-token');
            navigate('/');
        });
    };

    if (isRoleLoading) return (
        <div className="flex h-screen items-center justify-center bg-slate-50">
            <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
    );

    const hrLinks = [
        { name: "Overview", path: "/dashboard", icon: <FaHome />, end: true },
        { name: "Asset Inventory", path: "/dashboard/asset-list", icon: <FaBox /> },
        { name: "Add Asset", path: "/dashboard/add-asset", icon: <TbCubePlus /> },
        { name: "All Requests", path: "/dashboard/all-requests", icon: <MdOutlineHistoryEdu /> },
        { name: "Employees", path: "/dashboard/my-employees", icon: <FaUsers /> },
        { name: "Subscription", path: "/dashboard/package-upgrade", icon: <FaCrown /> },
        { name: "Billing", path: "/dashboard/payment-history", icon: <FaHistory /> },
    ];

    const employeeLinks = [
        { name: "Dashboard", path: "/dashboard", icon: <FaHome />, end: true },
        { name: "My Assets", path: "/dashboard/my-assets", icon: <MdInventory /> },
        { name: "Request Asset", path: "/dashboard/request-asset", icon: <TbDevicesPlus /> },
        { name: "History", path: "/dashboard/my-request", icon: <MdOutlineHistoryEdu /> },
        { name: "My Team", path: "/dashboard/my-team", icon: <FaUsers /> },
    ];

    const links = role === 'hr' ? hrLinks : employeeLinks;

    return (
        <div className="flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
            
            {/* --- SIDEBAR (Desktop) --- */}
            <aside 
                className={`hidden lg:flex flex-col bg-slate-900 text-white transition-all duration-300 relative z-20 
                ${isSidebarOpen ? "w-64" : "w-20"}`}
            >
                {/* Brand */}
                <div className="h-16 flex items-center px-6 border-b border-slate-800/50">
                    <Link to="/" className="flex items-center gap-3 overflow-hidden whitespace-nowrap">
                        <div className="min-w-[2rem]">
                            {/* Ensure LogoFull supports contrast or use a wrapper div with brightness filters */}
                            <div className="brightness-0 invert">
                                <LogoFull className="h-8 w-auto" />
                            </div>
                        </div>
                        <span className={`font-black text-xl tracking-tight transition-opacity duration-300 ${!isSidebarOpen && "opacity-0"}`}>
                            AssetVerse
                        </span>
                    </Link>
                </div>

                {/* Navigation */}
                <div className="flex-1 overflow-y-auto py-6 px-3 space-y-1 custom-scrollbar">
                    <p className={`px-3 mb-2 text-xs font-bold text-slate-500 uppercase tracking-widest transition-opacity duration-300 ${!isSidebarOpen && "opacity-0 hidden"}`}>
                        Menu
                    </p>
                    {links.map((item, index) => (
                        <NavLink
                            key={index}
                            to={item.path}
                            end={item.end}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group relative
                                ${isActive 
                                    ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20" 
                                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                                }`
                            }
                        >
                            <span className="text-lg min-w-[1.25rem] flex justify-center">{item.icon}</span>
                            <span className={`font-medium text-sm whitespace-nowrap transition-all duration-300 ${!isSidebarOpen ? "w-0 opacity-0 overflow-hidden" : "w-auto opacity-100"}`}>
                                {item.name}
                            </span>

                            {/* Tooltip for Collapsed Sidebar */}
                            {!isSidebarOpen && (
                                <div className="absolute left-full ml-4 px-2 py-1 bg-slate-800 text-white text-xs font-bold rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 whitespace-nowrap">
                                    {item.name}
                                </div>
                            )}
                        </NavLink>
                    ))}
                </div>

                {/* Profile Link (Bottom) */}
                <div className="p-3 border-t border-slate-800/50">
                    <NavLink to="/dashboard/profile" className={({isActive}) => `flex items-center gap-3 p-3 rounded-xl transition-colors ${isActive ? 'bg-slate-800' : 'hover:bg-slate-800'}`}>
                        <div className="avatar">
                            <div className="w-9 rounded-full ring-1 ring-slate-600">
                                <img src={user?.photoURL || "https://i.ibb.co/T0x6c6z/profile.png"} alt="user" />
                            </div>
                        </div>
                        <div className={`overflow-hidden transition-all duration-300 ${!isSidebarOpen && "w-0 opacity-0"}`}>
                            <p className="text-sm font-bold text-white truncate">{user?.displayName}</p>
                            <p className="text-xs text-slate-500 truncate capitalize">{role}</p>
                        </div>
                    </NavLink>
                </div>

                {/* Toggle Button (Absolute) */}
                <button 
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="absolute -right-3 top-20 bg-blue-600 text-white p-1 rounded-full border-4 border-slate-50 shadow-sm hover:bg-blue-700 transition-colors z-30"
                >
                    {isSidebarOpen ? <FaChevronLeft size={10} /> : <FaChevronRight size={10} />}
                </button>
            </aside>

            {/* --- MAIN CONTENT WRAPPER --- */}
            <div className="flex-1 flex flex-col h-full overflow-hidden relative">
                
                {/* HEADER */}
                <header className="h-16 bg-white border-b border-slate-200 flex justify-between items-center px-4 lg:px-8 shrink-0 z-10">
                    {/* Mobile Menu Toggle */}
                    <div className="flex items-center gap-4 lg:hidden">
                        <label htmlFor="my-drawer-mobile" className="btn btn-square btn-ghost btn-sm text-slate-600">
                            <FaBars size={18} />
                        </label>
                        <span className="font-bold text-slate-800">AssetVerse</span>
                    </div>

                    {/* Desktop: Page Title / Breadcrumb Placeholder */}
                    <div className="hidden lg:block">
                        <h2 className="text-lg font-bold text-slate-800">
                            {role === 'hr' ? 'HR Workspace' : 'Employee Dashboard'}
                        </h2>
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-3">
                        {/* Search Bar (Visual Only) */}
                        <div className="hidden md:flex items-center bg-slate-100 rounded-full px-4 py-2 border border-slate-200">
                            <FaSearch className="text-slate-400 text-xs mr-2" />
                            <input type="text" placeholder="Quick search..." className="bg-transparent text-sm outline-none text-slate-600 w-32 focus:w-48 transition-all" />
                        </div>

                        {/* Notifications */}
                        <button className="btn btn-circle btn-ghost btn-sm text-slate-500 relative">
                            <FaBell />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>

                        <div className="h-6 w-px bg-slate-200 mx-1"></div>

                        {/* Logout */}
                        <button 
                            onClick={handleLogOut}
                            className="flex items-center gap-2 text-slate-500 hover:text-rose-600 text-sm font-bold transition-colors px-2"
                        >
                            <FaSignOutAlt />
                            <span className="hidden sm:inline">Logout</span>
                        </button>
                    </div>
                </header>

                {/* SCROLLABLE CONTENT AREA */}
                <main className="flex-1 overflow-y-auto bg-slate-50 p-4 lg:p-8">
                    <div className="max-w-7xl mx-auto">
                        {/* Warning Banner */}
                        <div className="mb-6">
                            <LimitWarning />
                        </div>
                        
                        {/* Page Outlet */}
                        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                            <Outlet />
                        </div>
                    </div>
                </main>

            </div>

            {/* --- MOBILE DRAWER (Overlay) --- */}
            <div className="drawer-side z-50 lg:hidden">
                <input id="my-drawer-mobile" type="checkbox" className="drawer-toggle" />
                <label htmlFor="my-drawer-mobile" className="drawer-overlay"></label>
                <div className="menu p-4 w-64 min-h-full bg-slate-900 text-slate-300 flex flex-col">
                    {/* Mobile Brand */}
                    <div className="flex items-center gap-3 px-2 mb-8 mt-2">
                        <div className="brightness-0 invert">
                            <LogoFull className="h-6 w-auto" />
                        </div>
                        <span className="font-bold text-white text-lg">AssetVerse</span>
                    </div>

                    {/* Mobile Links */}
                    <ul className="flex-1 space-y-1">
                        {links.map((item, index) => (
                            <li key={index}>
                                <NavLink
                                    to={item.path}
                                    end={item.end}
                                    onClick={() => document.getElementById('my-drawer-mobile').checked = false}
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 px-4 py-3 rounded-lg ${isActive ? "bg-blue-600 text-white" : "hover:bg-slate-800"}`
                                    }
                                >
                                    <span className="text-lg">{item.icon}</span>
                                    <span className="font-medium">{item.name}</span>
                                </NavLink>
                            </li>
                        ))}
                    </ul>

                    {/* Mobile Profile & Logout */}
                    <div className="pt-4 border-t border-slate-800 mt-4">
                        <div className="flex items-center gap-3 px-2 mb-4">
                            <div className="avatar">
                                <div className="w-8 rounded-full">
                                    <img src={user?.photoURL} alt="" />
                                </div>
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-sm font-bold text-white truncate">{user?.displayName}</p>
                                <p className="text-xs text-slate-500 capitalize">{role}</p>
                            </div>
                        </div>
                        <button 
                            onClick={handleLogOut}
                            className="btn btn-error btn-outline btn-sm w-full text-white"
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default DashboardLayoutRed;