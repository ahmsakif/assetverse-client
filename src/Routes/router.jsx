import React from 'react';
import { createBrowserRouter } from 'react-router';
import LoadingSpinner from '../Utilities/LoadingSpinner';
import HomeLayout from '../Layouts/HomeLayout';
import Home from '../Pages/Home/Home';
import JoinHR from '../Pages/Register/JoinHR';
import JoinEmployee from '../Pages/Register/JoinEmployee';
import AuthLayout from '../Layouts/AuthLayout';

const router = createBrowserRouter([
    {
        path: "/",
        Component: HomeLayout,
        hydrateFallbackElement: <LoadingSpinner></LoadingSpinner>,
        children: [
            {
                index: true,
                Component: Home,
            }
        ]
    },
    {
        path: '/',
        Component: AuthLayout,
        hydrateFallbackElement: <LoadingSpinner></LoadingSpinner>,
        children: [
            {
                path: '/join-hr',
                Component: JoinHR,
            },
            {
                path: '/join-employee',
                Component: JoinEmployee,
            },
        ]
    }
])

export default router;