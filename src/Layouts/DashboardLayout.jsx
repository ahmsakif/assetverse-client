import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate, Link } from 'react-router';
import useRole from '../Hooks/useRole';
import useAuth from '../Hooks/useAuth';
import { FaHome, FaBox, FaUsers, FaSignOutAlt, FaBars, FaCrown, FaHistory, FaUserAlt } from 'react-icons/fa';
import { GoSidebarExpand, GoSidebarCollapse } from "react-icons/go";
import LogoFull from '../Components/Logo/LogoFull';
import { TbCubePlus, TbDevicesPlus } from "react-icons/tb";
import { MdInventory, MdOutlineHistoryEdu } from 'react-icons/md';
import LimitWarning from '../Utilities/LimitWarning';

const DashboardLayout = () => {
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
        <div className="flex h-screen items-center justify-center">
            <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
    );

    const hrLinks = [
        { name: "My Profile", path: "/dashboard/profile", icon: <FaUserAlt />, end: true },
        { name: "Overview", path: "/dashboard", icon: <FaHome />, end: true },
        { name: "Asset List", path: "/dashboard/asset-list", icon: <FaBox /> },
        { name: "Add Asset", path: "/dashboard/add-asset", icon: <TbCubePlus /> },
        { name: "All Requests", path: "/dashboard/all-requests", icon: <MdOutlineHistoryEdu /> },
        { name: "My Employees", path: "/dashboard/my-employees", icon: <FaUsers /> },
        { name: "Package Upgrade", path: "/dashboard/package-upgrade", icon: <FaCrown /> },
        { name: "Payment History", path: "/dashboard/payment-history", icon: <FaHistory /> },
    ];

    const employeeLinks = [
        { name: "My Profile", path: "/dashboard/profile", icon: <FaUserAlt />, end: true },
        { name: "Dashboard", path: "/dashboard", icon: <FaHome />, end: true },
        { name: "My Assets", path: "/dashboard/my-assets", icon: <MdInventory /> },
        { name: "Request Asset", path: "/dashboard/request-asset", icon: <TbDevicesPlus /> },
        { name: "My Request", path: "/dashboard/my-request", icon: <MdOutlineHistoryEdu /> },
        { name: "My Team", path: "/dashboard/my-team", icon: <FaUsers /> },
    ];

    const links = role === 'hr' ? hrLinks : employeeLinks;

    return (
        <div className="drawer lg:drawer-open bg-base-200">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

            <div className="drawer-content flex flex-col min-h-screen">
                {/* --- MODERN NAVBAR --- */}
                <nav className="navbar h-20 w-full bg-base-100/70 backdrop-blur-md border-b border-base-300 flex justify-between items-center z-30 sticky top-0 px-6">
                    <div className="flex items-center gap-4">
                        <label htmlFor="my-drawer-4" className='btn btn-ghost lg:hidden'>
                            <FaBars className='text-xl' />
                        </label>
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="btn btn-ghost btn-circle hidden lg:flex"
                        >
                            {isSidebarOpen ? <GoSidebarCollapse size={22} /> : <GoSidebarExpand size={22} />}
                        </button>
                        <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                            {role === 'hr' ? 'HR Portal' : 'Employee Portal'}
                        </h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden sm:block text-right">
                            <p className="text-sm font-bold leading-tight">{user?.displayName}</p>
                            <p className="text-[10px] uppercase tracking-widest text-primary font-bold">{role}</p>
                        </div>
                        <div className="avatar">
                            <div className="w-11 rounded-xl ring-2 ring-primary/20 ring-offset-base-100 ring-offset-2">
                                <img src={user?.photoURL || "https://i.ibb.co/T0x6c6z/profile.png"} alt="user" />
                            </div>
                        </div>
                    </div>
                </nav>

                <div className="px-6">
                    <LimitWarning />
                </div>

                {/* --- MAIN CONTENT AREA --- */}
                <main className="p-6 lg:p-10 flex-grow">
                    <div className="bg-base-100 rounded-3xl shadow-sm min-h-full border border-base-300 p-4 md:p-8">
                        <Outlet />
                    </div>
                </main>
            </div>

            {/* --- SIDEBAR --- */}
            <div className="drawer-side z-40 overflow-visible">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className={`flex min-h-full flex-col bg-white transition-all duration-300 border-r border-base-300 
                    ${isSidebarOpen ? "w-72" : "w-20"}`}
                >
                    {/* Header */}
                    <div className="h-20 flex items-center px-6 border-b border-base-100 mb-6">
                        <Link to="/" className="flex items-center gap-3">
                            <LogoFull className="w-8 h-8 text-primary" />
                            <span className={`text-2xl font-black text-primary tracking-tighter transition-opacity duration-200 ${!isSidebarOpen && "opacity-0 hidden"}`}>
                                AssetVerse
                            </span>
                        </Link>
                    </div>

                    {/* Links */}
                    <ul className="menu w-full px-3 gap-1">
                        {links.map((item, index) => (
                            <li key={index} className="mb-1">
                                <NavLink
                                    to={item.path}
                                    end={item.end}
                                    className={({ isActive }) =>
                                        `flex items-center gap-4 p-3.5 rounded-xl transition-all duration-200 group
                                        ${!isSidebarOpen ? "tooltip tooltip-right justify-center" : ""}
                                        ${isActive ? "bg-primary text-white shadow-lg shadow-primary/25" : "hover:bg-primary/10 text-base-content/70 hover:text-primary"}`
                                    }
                                    data-tip={item.name}
                                >
                                    <span className={`text-xl transition-transform duration-200 group-hover:scale-110`}>
                                        {item.icon}
                                    </span>
                                    <span className={`font-semibold transition-all duration-200 ${!isSidebarOpen ? "hidden" : "block"}`}>
                                        {item.name}
                                    </span>
                                </NavLink>
                            </li>
                        ))}
                    </ul>

                    {/* Logout Section */}
                    <div className="mt-auto p-4 border-t border-base-100">
                        <button
                            onClick={handleLogOut}
                            className={`w-full flex items-center gap-4 p-3.5 rounded-xl text-error hover:bg-error/10 transition-all duration-200 font-bold
                            ${!isSidebarOpen ? "justify-center tooltip tooltip-right" : ""}`}
                            data-tip="Logout"
                        >
                            <FaSignOutAlt className="text-xl" />
                            <span className={`${!isSidebarOpen ? "hidden" : "block"}`}>Sign Out</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;