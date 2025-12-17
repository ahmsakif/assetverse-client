import React from 'react';
import { createBrowserRouter } from 'react-router';
import LoadingSpinner from '../Utilities/LoadingSpinner';
import HomeLayout from '../Layouts/HomeLayout';
import Home from '../Pages/Home/Home';
import JoinHR from '../Pages/Register/JoinHR';
import JoinEmployee from '../Pages/Register/JoinEmployee';
import AuthLayout from '../Layouts/AuthLayout';
import Login from '../Pages/Login/Login';
import DashboardLayout from '../Layouts/DashboardLayout';
import HrHome from '../Pages/Home/HrHome';
import EmployeeHome from '../Pages/Home/EmployeeHome';

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
            {
                path: '/login',
                Component: Login,
            },
        ]
    },
    {
        path: "dashboard",
        Component: DashboardLayout,
        children: [
            {
                path: "hr",
                Component: HrHome,
            },
            {
                path: "employee",
                Component: EmployeeHome,
            },
        ]
    }
])

export default router;