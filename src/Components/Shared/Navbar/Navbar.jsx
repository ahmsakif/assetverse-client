import React from 'react';
import { NavLink, useNavigate } from 'react-router';

const Navbar = () => {

    // const {
    //     user, loading, signOutUser
    // } = useAuth()
    // const navigate = useNavigate()

    const getActiveClass = ({ isActive }) => {
        return (
            isActive
                ? 'h-full py-2 px-2 rounded border border-primary text-primary hover:text-primary-content hover:bg-primary'
                : 'h-full py-2 px-2 hover:bg-primary hover:text-primary-content rounded'
        )
    }
    // const getSidebarActiveClass = ({ isActive }) => {
    //     return (
    //         isActive
    //             ? 'bg-base-300 py-1'
    //             : ' py-1 space-y-1'
    //     )
    // }

    const navLinks = <>
        <li><NavLink to="/" className={getActiveClass}>Home</NavLink></li>
        <li><NavLink to="/join-as-employee" className={getActiveClass}>Join As Employee</NavLink></li>
        <li><NavLink to="/join-as-hr" className={getActiveClass}>Join As HR Manager</NavLink></li>
    </>

    return (
        <div className="bg-base-100 shadow-xs h-20 flex justify-center items-center top-0 sticky">

            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            {/* <div className="drawer-content flex flex-col"></div> */}

            <div className="navbar max-w-9xl mx-auto px-4 ">
                <div className="navbar-start flex-1 ">

                    {/* Drawer */}
                    <div className="flex-none md:hidden">
                        <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block h-6 w-6 stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                ></path>
                            </svg>
                        </label>
                    </div>
                    {/* Navbar */}
                    <a><h2 className='text-2xl font-semibold '>AssetVerse</h2></a>
                </div>

                <div className="navbar-end flex-2 gap-4">
                    <div className="navbar-center hidden md:flex">
                        <ul className="flex gap-4 ">
                        {/* <ul className="flex gap-4 *:h-full *:py-2 *:px-2 *:hover:bg-primary *:hover:text-primary-content *:rounded  "> */}
                            {
                                navLinks
                            }
                        </ul>
                    </div>
                    <a className="btn btn-primary btn-outline text-base w-24">Login</a>
                </div>
            </div>
            {/* Drawer Aside */}
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 min-h-full w-80 p-4">
                    {/* Sidebar content here */}
                    <li><a>Home</a></li>
                    <li><a>Join As Employee</a></li>
                    <li><a>Join As HR Manager</a></li>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;