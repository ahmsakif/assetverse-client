import React from 'react';
import Navbar from '../Components/Shared/Navbar/Navbar';
import { Outlet } from 'react-router';
import { Toaster } from 'react-hot-toast';
import LogoFull from '../Components/Logo/LogoFull';
import Logo from '../Components/Logo/Logo';

const AuthLayout = () => {
    return (
        <div>
            <div className='relative z-50'>
                <Logo></Logo>
            </div>
            <Outlet></Outlet>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </div>
    );
};

export default AuthLayout;