import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const TopAssetsChart = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: chartData = [], isLoading } = useQuery({
        queryKey: ['top-assets-stats', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/asset-request-stats?email=${user.email}`);
            return res.data;
        }
    });

    const COLORS = ['#4F46E5', '#6366F1', '#818CF8', '#A5B4FC', '#C7D2FE'];

    if (isLoading) return <div className="h-80 w-full skeleton rounded-3xl"></div>;

    return (
        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm h-full">
            <div className="mb-6">
                <h3 className="text-xl font-black text-slate-800 tracking-tight">Top Requested Assets</h3>
                <p className="text-sm text-slate-400 font-medium">Most popular items requested by your team</p>
            </div>

            <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis 
                            dataKey="name" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }}
                            dy={10}
                        />
                        <YAxis 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fill: '#94a3b8', fontSize: 12 }} 
                        />
                        <Tooltip 
                            cursor={{ fill: '#f8fafc' }}
                            contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                        />
                        <Bar dataKey="requests" radius={[8, 8, 0, 0]} barSize={40}>
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default TopAssetsChart;