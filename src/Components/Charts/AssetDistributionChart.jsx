import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';
import { FaChartPie, FaCircle } from 'react-icons/fa';

const AssetDistributionChart = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    // 1. Fetch Data
    const { data: typeCount = {}, isLoading } = useQuery({
        queryKey: ['asset-type-count', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/assets/type-quantity?email=${user.email}`);
            return res.data;
        }
    });

    // 2. Prepare Data (with safe defaults)
    const returnableCount = typeCount.Returnable || 0;
    const nonReturnableCount = typeCount['Non-Returnable'] || 0;
    const totalAssets = returnableCount + nonReturnableCount;

    // Handle "No Data" State explicitly
    const hasData = totalAssets > 0;
    
    const chartData = hasData ? [
        { name: 'Returnable', value: returnableCount, color: '#6366f1' }, // Indigo-500
        { name: 'Non-Returnable', value: nonReturnableCount, color: '#10b981' }, // Emerald-500
    ] : [
        { name: 'No Assets', value: 1, color: '#e2e8f0' } // Slate-200 (Empty Placeholder)
    ];

    // 3. Custom Tooltip Component
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const data = payload[0];
            return (
                <div className="bg-white p-4 rounded-2xl shadow-xl border border-slate-100">
                    <p className="text-xs font-black uppercase text-slate-400 tracking-widest mb-1">
                        {data.name}
                    </p>
                    <p className="text-xl font-black text-slate-800">
                        {data.value} <span className="text-xs font-bold text-slate-400">Items</span>
                    </p>
                </div>
            );
        }
        return null;
    };

    // 4. Custom Legend Component
    const CustomLegend = ({ payload }) => {
        return (
            <div className="flex justify-center gap-6 mt-4">
                {payload.map((entry, index) => (
                    <div key={`item-${index}`} className="flex items-center gap-2">
                        <FaCircle size={8} style={{ color: entry.color }} />
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                            {entry.value}
                        </span>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-8 h-full flex flex-col relative overflow-hidden">
            
            {/* Header */}
            <div className="flex justify-between items-start mb-2 relative z-10">
                <div>
                    <h3 className="text-xl font-black text-slate-800 tracking-tight">Inventory Type</h3>
                    <p className="text-sm text-slate-400 font-medium">Returnable vs. Non-returnable</p>
                </div>
                <div className="bg-indigo-50 p-3 rounded-2xl text-indigo-500">
                    <FaChartPie size={20} />
                </div>
            </div>

            {/* Total Count (Centered Overlay) */}
            {hasData && (
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pt-12">
                    <span className="text-4xl font-black text-slate-800">{totalAssets}</span>
                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Total Assets</span>
                </div>
            )}

            {/* Chart Area */}
            <div className="flex-1 min-h-[250px] relative z-0">
                {isLoading ? (
                    <div className="h-full w-full flex items-center justify-center">
                        <span className="loading loading-spinner loading-lg text-primary"></span>
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                innerRadius={80} // Creates the "Donut" look
                                outerRadius={110}
                                paddingAngle={hasData ? 6 : 0}
                                dataKey="value"
                                stroke="none"
                                cornerRadius={8} // Rounds the edges of the pie slices
                            >
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            
                            {hasData && <Tooltip content={<CustomTooltip />} />}
                            
                            {hasData && (
                                <Legend 
                                    content={<CustomLegend />} 
                                    verticalAlign="bottom" 
                                    height={36}
                                />
                            )}
                        </PieChart>
                    </ResponsiveContainer>
                )}
            </div>

            {/* Empty State Message */}
            {!hasData && !isLoading && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none pt-20">
                    <p className="text-sm font-bold text-slate-400">No inventory data yet</p>
                </div>
            )}
        </div>
    );
};

export default AssetDistributionChart;