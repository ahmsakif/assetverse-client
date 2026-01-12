import React from 'react';
import Navbar from '../Components/Shared/Navbar/Navbar';
import { Link, Outlet } from 'react-router';
import { Toaster } from 'react-hot-toast';
import LogoFull from '../Components/Logo/LogoFull';
import Logo from '../Components/Logo/Logo';
import AuthContent from '../Components/Shared/AuthContent/AuthContent';
import AuthContentTwo from '../Components/Shared/AuthContent/AuthContentTwo';

const AuthLayout = () => {
    return (
        <div>
            <div className='relative z-50'>
                <Link to="/"><Logo></Logo></Link>
            </div>
            <div className='flex bg-gradient-to-br from-blue-600 to-purple-700'>
                <Outlet></Outlet>
                <div className=' w-1/2 min-h-screen hidden lg:block'>
                    {/* <AuthContent /> */}
                    <AuthContentTwo />
                </div>
            </div>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </div>
    );
};

export default AuthLayout;