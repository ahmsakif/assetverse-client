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
import DashboardHome from '../Pages/Home/DashboardHome';
import AddAsset from '../Pages/HrPages/AddAsset';
import AssetList from '../Pages/Shared/AssetList';
import RequestAsset from '../Pages/EmployeePages/RequestAsset';

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
                index: true,
                Component: DashboardHome,
            },
            {
                path: 'add-asset',
                Component: AddAsset,
            },
            {
                path: 'asset-list',
                Component: AssetList,
            },
            {
                path: 'request-asset',
                Component: RequestAsset,
            }
        ]
    }
])

export default router;