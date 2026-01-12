import React from 'react';
import { useQuery } from '@tanstack/react-query';

import { FaUsers, FaClock, FaBoxOpen, FaExclamationTriangle } from 'react-icons/fa';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'; // npm install recharts
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import LoadingSpinner from '../../Utilities/LoadingSpinner';
import DynamicHeader from '../../Utilities/DynamicHeader';
import TopAssetsChart from '../../Components/Charts/TopAssetsChart';
import AssetDistributionChart from '../../Components/Charts/AssetDistributionChart';

const HrHome = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    // 1. Fetch Stats (Employees & Limit)
    const { data: employeeData = {}, isLoading: empLoading } = useQuery({
        queryKey: ['hr-stat-employees', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/my-employees?email=${user.email}&limit=1`);
            return res.data;
        }
    });

    // 2. Fetch Pending Requests (Top 5 for overview)
    const { data: requestData = {}, isLoading: reqLoading } = useQuery({
        queryKey: ['hr-stat-requests', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/requests?hrEmail=${user.email}&limit=5`);
            return res.data;
        }
    });

    // 3. Fetch Assets for total asset counting
    const {
        data: assetsData = { result: [], count: 0 },
        isLoading: assetLoading,
    } = useQuery({

        queryKey: ['assets', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure('/assets', {
                params: {
                    email: user.email,
                }
            });
            return res.data
        },
    })

    const { data: typeCount = {} } = useQuery({
        queryKey: ['asset-type-count', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/assets/type-quantity?email=${user.email}`
            );
            return res.data;
        }
    });

    const totalAssets = Number(typeCount.Returnable) + Number(typeCount['Non-Returnable'])


    if (empLoading || reqLoading || assetLoading) return <LoadingSpinner />;

    const pendingRequests = requestData.result?.filter(r => r.requestStatus === 'pending') || [];
    const currentEmployees = employeeData.count || 0;
    const limit = employeeData.packageLimit || 0;

    // Pie Chart Data: Asset Type Distribution (Sample logic)
    const chartData = [
        { name: 'Returnable', value: typeCount.Returnable, color: '#3B82F6' },
        { name: 'Non-Returnable', value: typeCount['Non-Returnable'], color: '#F59E0B' },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <title>Dashboard - AssetVerse</title>
            {/* --- HEADER --- */}
            <DynamicHeader userName={user?.displayName?.split(' ')[0]} />

            {/* --- STATS GRID --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Employees"
                    value={currentEmployees}
                    icon={<FaUsers />}
                    color="bg-blue-500"
                    subtitle={`Limit: ${limit}`}
                />
                <StatCard
                    title="Pending Requests"
                    value={pendingRequests.length}
                    icon={<FaClock />}
                    color="bg-amber-500"
                    subtitle="Requires Action"
                />
                <StatCard
                    title="Asset Stock"
                    value={totalAssets}
                    icon={<FaBoxOpen />}
                    color="bg-emerald-500"
                    subtitle={assetsData.count ? "Stock is healthy" : "You haven't any asset"}
                />
                <StatCard
                    title="Usage Limit"
                    value={`${Math.round((currentEmployees / limit) * 100)}%`}
                    icon={<FaExclamationTriangle />}
                    color="bg-rose-500"
                    subtitle="Package Capacity"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* --- PENDING REQUESTS TABLE --- */}
                <div className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold">Recent Pending Requests</h2>
                        <button className="btn btn-ghost btn-sm text-primary">View All</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr className="text-gray-400 uppercase text-[10px] tracking-widest border-none">
                                    <th>Employee</th>
                                    <th>Asset</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pendingRequests.slice(0, 5).map((req) => (
                                    <tr key={req._id} className="hover:bg-gray-50 border-none transition-colors">
                                        <td className="font-medium">{req.requesterName}</td>
                                        <td>{req.assetName}</td>
                                        <td className="text-gray-400 text-sm">{new Date(req.requestDate).toLocaleDateString()}</td>
                                        <td><span className="badge badge-warning badge-sm py-3 px-4">Pending</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* --- ASSET DISTRIBUTION CHART --- */}
                <AssetDistributionChart />
                {/* Top Assets Chart */}
                <TopAssetsChart />

            </div>
        </div>
    );
};

// Reusable Stat Card Component
const StatCard = ({ title, value, icon, color, subtitle }) => (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-5 group hover:shadow-md transition-shadow">
        <div className={`${color} p-4 rounded-2xl text-white text-2xl shadow-lg shadow-black/10 transition-transform group-hover:scale-110`}>
            {icon}
        </div>
        <div>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">{title}</p>
            <h3 className="text-2xl font-black text-gray-800">{value}</h3>
            <p className="text-[10px] text-gray-500 font-medium">{subtitle}</p>
        </div>
    </div>
);

export default HrHome;