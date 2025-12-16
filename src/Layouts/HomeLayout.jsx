import React from 'react';
import Home from '../Pages/Home/Home';
import { Outlet } from 'react-router';
import Navbar from '../Components/Shared/Navbar/Navbar';
import Footer from '../Components/Shared/Footer/Footer';
import { Toaster } from 'react-hot-toast';

const HomeLayout = () => {
    return (
        <div className='min-h-screen flex flex-col '>
            <Navbar></Navbar>
            <section className='overflow-hidden'>
                <Outlet></Outlet>
            </section>
            <Footer></Footer>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </div>
    );
};

export default HomeLayout;