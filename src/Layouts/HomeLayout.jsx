import React from 'react';
import Home from '../Pages/Home/Home';
import { Outlet } from 'react-router';
import Navbar from '../Components/Shared/Navbar/Navbar';
import Footer from '../Components/Shared/Footer/Footer';

const HomeLayout = () => {
    return (
        <div className='min-h-screen flex flex-col justify-between'>
            <Navbar></Navbar>
            <section className='overflow-hidden'>
                <Outlet></Outlet>
            </section>
            <Footer></Footer>
        </div>
    );
};

export default HomeLayout;