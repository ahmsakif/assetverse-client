import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router';
import useRole from '../Hooks/useRole';
import useAuth from '../Hooks/useAuth';
import { FaHome, FaBox, FaUserPlus, FaUsers, FaClipboardList, FaSignOutAlt, FaBars } from 'react-icons/fa';
import { GoSidebarExpand, GoSidebarCollapse } from "react-icons/go";
import LogoFull from '../Components/Logo/LogoFull';
import { TbCubePlus } from "react-icons/tb";

const DashboardLayout = () => {
    const { user, signOutUser } = useAuth();
    const [role, isRoleLoading] = useRole();
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const handleLogOut = () => {
        signOutUser()
            .then(() => { navigate('/') })
    };

    if (isRoleLoading) return <span className="loading loading-spinner text-primary"></span>;

    // --- MENUS ---
    const hrLinks = [
        { name: "Dashboard", path: "/dashboard", icon: <FaHome size={24} />, end: true },
        { name: "Asset List", path: "/dashboard/asset-list", icon: <FaBox size={24} /> },
        { name: "Add Asset", path: "/dashboard/add-asset", icon: <TbCubePlus size={24} /> },
        { name: "All Requests", path: "/dashboard/all-requests", icon: <FaClipboardList size={24} /> },
        { name: "My Employees", path: "/dashboard/my-employees", icon: <FaUsers size={24} /> },
        { name: "Add Employee", path: "/dashboard/add-employee", icon: <FaUserPlus size={24} /> },
    ];

    const employeeLinks = [
        { name: "Dashboard", path: "/dashboard", icon: <FaHome size={24} />, end: true },
        { name: "My Assets", path: "/dashboard/my-assets", icon: <FaBox size={24} /> },
        { name: "Request Asset", path: "/dashboard/request-asset", icon: <FaClipboardList size={24} /> },
        { name: "My Team", path: "/dashboard/my-team", icon: <FaUsers size={24} /> },
    ];

    const links = role === 'hr' ? hrLinks : employeeLinks;

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

            {/* --- DRAWER CONTENT (Right Side / Main Page) --- */}
            <div className="drawer-content flex flex-col">

                {/* Navbar */}
                <nav className="navbar h-20 w-full bg-base-300 flex justify-between items-center z-10 sticky top-0 px-4 shadow-sm">
                    {/* Left: Toggle & Title */}
                    <div className="flex items-center gap-2">
                        <label htmlFor="my-drawer-4" className='btn btn-square btn-ghost md:hidden '>
                            <FaBars className='text-2xl font-bold text-black'></FaBars>
                        </label>
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="btn btn-square btn-ghost hidden md:flex "
                        >
                            {
                                isSidebarOpen ? <GoSidebarExpand className='text-2xl font-bold text-black' /> : <GoSidebarCollapse className='text-2xl font-bold text-black' />
                            }
                        </button>
                        <div className="text-xl font-bold text-primary">
                            {role === 'hr' ? 'HR Dashboard' : 'Employee Dashboard'}
                        </div>
                    </div>

                    {/* Right: User Profile */}
                    <div className="flex items-center gap-3">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-bold">{user?.displayName}</p>
                            <p className="text-xs text-gray-500 uppercase">{role}</p>
                        </div>
                        <div className="avatar">
                            <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img src={user?.photoURL || "https://i.ibb.co/T0x6c6z/profile.png"} alt="profile" />
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Page content here */}
                <div className="p-8 bg-base-100 min-h-[calc(100vh-64px)]">
                    <Outlet />
                </div>
            </div>

            {/* --- DRAWER SIDEBAR (Left Side) --- */}
            {/* We force 'overflow-visible' so tooltips show up when collapsed */}
            <div className="drawer-side z-20 overflow-visible">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>

                <div className={`flex min-h-full flex-col items-start bg-base-200 text-base-content transition-all duration-300 border-r border-base-300 w-64
                    ${isSidebarOpen ? "md:w-64" : "md:w-20"}`}
                >
                    {/* Sidebar Header / Logo */}
                    <div className="h-20 w-full flex items-center justify-center border-b border-base-300 mb-2">
                        {isSidebarOpen ? (
                            <span className="text-2xl font-bold text-primary flex items-center gap-2"> <LogoFull></LogoFull> AssetVerse</span>
                        ) : (
                            <span className="text-xl font-bold text-primary"><LogoFull></LogoFull></span>
                        )}
                    </div>

                    {/* Sidebar Content */}
                    <ul className="menu w-full px-2 gap-2">
                        {links.map((item, index) => (
                            <li key={index}>
                                {/* 1. Tooltip logic: Only active if sidebar is CLOSED (!isSidebarOpen) 
                                   2. NavLink: Handles the 'active' state automatically 
                                */}
                                <NavLink
                                    to={item.path}
                                    end={item.end}
                                    className={({ isActive }) =>
                                        `flex items-center gap-4 p-3 rounded-2xl transition-all
                                        ${!isSidebarOpen ? "tooltip tooltip-right" : ""}
                                        ${isActive ? "bg-primary text-white" : "hover:bg-base-300"}`
                                    }
                                    data-tip={item.name} // DaisyUI Tooltip Text
                                >
                                    {/* Icon */}
                                    <span className={`text-xl ${isSidebarOpen ? '' : 'md:mx-auto'} transition animate duration-300 `}>{item.icon}</span>

                                    {/* Text: Hidden if closed */}
                                    <span className={`whitespace-nowrap transition-all duration-300  ${!isSidebarOpen ? "md:hidden" : "md:block"}`}>
                                        {item.name}
                                    </span>
                                </NavLink>
                            </li>
                        ))}
                    </ul>

                    {/* Footer / Logout */}
                    <div className="mt-auto w-full p-2 border-t border-base-300">
                        <ul className="menu w-full px-0">
                            <li>
                                <button
                                    onClick={handleLogOut}
                                    className={`text-error hover:bg-error/10 flex items-center gap-4 p-3 
                                        ${!isSidebarOpen ? "tooltip tooltip-right" : ""}`}
                                    data-tip="Logout"
                                >
                                    <FaSignOutAlt className={`text-xl ${isSidebarOpen ? '' : 'md:mx-auto'}`} />
                                    <span className={`${!isSidebarOpen ? "md:hidden" : "block"}`}>Logout</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;