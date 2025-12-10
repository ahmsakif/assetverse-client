import React from 'react';
import Home from '../Pages/Home/Home';
import { Outlet } from 'react-router';
import Navbar from '../Components/Shared/Navbar/Navbar';


const HomeLayout = () => {
    return (
        <div className='min-h-screen'>
            <Navbar></Navbar>
            {/* <Outlet></Outlet> */}
            Footer Here
        </div>
    );
};

export default HomeLayout;