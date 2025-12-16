import React from 'react';
import Navbar from '../Components/Shared/Navbar/Navbar';
import { Outlet } from 'react-router';
import { Toaster } from 'react-hot-toast';

const AuthLayout = () => {
    return (
        <div>
            {/* <Navbar></Navbar> */}
            <Outlet></Outlet>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </div>
    );
};

export default AuthLayout;