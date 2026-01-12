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
import AssetList from '../Pages/HrPages/AssetList';
import RequestAsset from '../Pages/EmployeePages/RequestAsset';
import AllRequests from '../Pages/HrPages/AllRequest';
import MyAssets from '../Pages/EmployeePages/MyAssets';
import MyRequest from '../Pages/EmployeePages/MyRequest';
import MyEmployees from '../Pages/HrPages/MyEmployees';
import MyTeam from '../Pages/EmployeePages/MyTeam';
import JoinAs from '../Pages/Register/JoinAs';
import UpgradePackage from '../Pages/HrPages/UpgradePackage';
import PaymentSuccess from '../Components/Payments/PaymentSuccess';
import PaymentHistory from '../Components/Payments/PaymentHistory';
import HRRoute from './HRRoute';
import EmployeeRoute from './EmployeeRoute';
import Profile from '../Pages/Shared/Profile';
import ErrorPage from '../Pages/ErrorPages/ErrorPage';
import Pricing from '../Pages/Pricing/Pricing';

const router = createBrowserRouter([
    {
        path: "/",
        Component: HomeLayout,
        errorElement: <ErrorPage />,
        hydrateFallbackElement: <LoadingSpinner></LoadingSpinner>,
        children: [
            {
                index: true,
                Component: Home,
            },
            {
                path: 'pricing',
                Component: Pricing,
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
            {
                path: '/join-as',
                Component: JoinAs,
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
                element: <HRRoute><AddAsset /></HRRoute>,
            },
            {
                path: 'asset-list',
                element: <HRRoute><AssetList /></HRRoute>,
            },
            {
                path: 'request-asset',
                element: <EmployeeRoute><RequestAsset /></EmployeeRoute>,
            },
            {
                path: 'all-requests',
                element: <HRRoute><AllRequests /></HRRoute>,
            },
            {
                path: 'my-assets',
                element: <EmployeeRoute><MyAssets /></EmployeeRoute>,
            },
            {
                path: 'my-team',
                element: <EmployeeRoute><MyTeam /></EmployeeRoute>,
            },
            {
                path: 'my-employees',
                element: <HRRoute><MyEmployees /></HRRoute>,
            },
            {
                path: 'my-request',
                element: <EmployeeRoute><MyRequest /></EmployeeRoute>,
            },
            {
                path: 'package-upgrade',
                element: <HRRoute><UpgradePackage /></HRRoute>,
            },
            {
                path: 'payment-success',
                element: <PaymentSuccess />,
            },
            {
                path: 'payment-history',
                element: <HRRoute><PaymentHistory /></HRRoute>,
            },
            {
                path: 'profile',
                element: <Profile></Profile>
            }
        ]
    }
])

export default router;