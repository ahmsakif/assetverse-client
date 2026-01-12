import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import { FaBirthdayCake, FaUsers, FaHourglassHalf, FaCheckCircle } from 'react-icons/fa';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import LoadingSpinner from '../../Utilities/LoadingSpinner';
import DynamicHeader from '../../Utilities/DynamicHeader';

const EmployeeHome = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [selectedHrEmail, setSelectedHrEmail] = useState(null);

    // 1. Fetch User's Company Affiliations
    const { data: companies = [], isLoading: companiesLoading } = useQuery({
        queryKey: ['my-affiliations', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get('/my-affiliations', { params: { email: user.email } });
            return res.data;
        }
    });

    // Set default company once loaded
    useEffect(() => {
        if (companies.length > 0 && !selectedHrEmail) {
            setSelectedHrEmail(companies[0].hrEmail);
        }
    }, [companies, selectedHrEmail]);

    // 2. Fetch Team Members for selected company
    const { data: teamMembers = [], isLoading: teamLoading } = useQuery({
        queryKey: ['team-members', user?.email, selectedHrEmail],
        enabled: !!user?.email && !!selectedHrEmail,
        queryFn: async () => {
            const res = await axiosSecure.get('/team-members', {
                params: { email: user.email, hrEmail: selectedHrEmail }
            });
            return res.data;
        }
    });

    // 3. Fetch Asset Requests
    const { data: requestData = {}, isLoading: reqLoading } = useQuery({
        queryKey: ['employee-requests', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/requests?email=${user.email}`);
            return res.data;
        }
    });

    if (companiesLoading || teamLoading || reqLoading) return <LoadingSpinner />;

    // --- LOGIC ---
    const requests = requestData.result || [];
    const pendingCount = requests.filter(r => r.requestStatus === 'pending').length;
    const approvedCount = requests.filter(r => r.requestStatus === 'approved').length;

    const currentMonth = new Date().getMonth();
    const upcomingBirthdays = teamMembers.filter(member => {
        if (!member.dateOfBirth) return false;
        return new Date(member.dateOfBirth).getMonth() === currentMonth;
    });

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <title>Dashboard- AssetVerse</title>
            {/* Header with Company Switcher */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <DynamicHeader userName={user?.displayName?.split(' ')[0]} />
                
                {/* Company Tabs (if affiliated with more than one) */}
                {companies.length > 1 && (
                    <div className="tabs tabs-boxed bg-base-100 p-1 border border-base-300">
                        {companies.map(comp => (
                            <a 
                                key={comp._id}
                                className={`tab transition-all ${selectedHrEmail === comp.hrEmail ? 'tab-active bg-primary text-white' : ''}`}
                                onClick={() => setSelectedHrEmail(comp.hrEmail)}
                            >
                                {comp.companyName}
                            </a>
                        ))}
                    </div>
                )}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Pending" value={pendingCount} icon={<FaHourglassHalf />} color="bg-amber-500" />
                <StatCard title="Approved" value={approvedCount} icon={<FaCheckCircle />} color="bg-emerald-500" />
                <StatCard title="Team Members" value={teamMembers.length} icon={<FaUsers />} color="bg-blue-500" />
                <StatCard title="Birthdays" value={upcomingBirthdays.length} icon={<FaBirthdayCake />} color="bg-rose-500" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* --- UPCOMING BIRTHDAYS --- */}
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-rose-50 text-rose-500 rounded-lg"><FaBirthdayCake /></div>
                        <h2 className="text-xl font-bold">Birthdays This Month</h2>
                    </div>
                    
                    <div className="space-y-4 flex-grow">
                        {upcomingBirthdays.length > 0 ? (
                            upcomingBirthdays.map((member, idx) => (
                                <div key={idx} className="flex items-center gap-4 p-3 hover:bg-rose-50/50 rounded-2xl transition-colors">
                                    <img src={member.image || "https://i.ibb.co/T0x6c6z/profile.png"} className="w-10 h-10 rounded-full object-cover" alt="" />
                                    <div>
                                        <p className="font-bold text-sm text-gray-800">{member.name}</p>
                                        <p className="text-xs text-gray-500">
                                            {new Date(member.dateOfBirth).toLocaleDateString('en-US', { day: 'numeric', month: 'long' })}
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="h-full flex items-center justify-center text-gray-400 italic text-sm py-10">
                                No birthdays this month
                            </div>
                        )}
                    </div>
                </div>

                {/* --- RECENT REQUESTS --- */}
                <div className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                    <h2 className="text-xl font-bold mb-6">Recent Asset Activity</h2>
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr className="text-gray-400 text-[10px] uppercase tracking-widest border-none">
                                    <th>Asset</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {requests.slice(0, 5).map(req => (
                                    <tr key={req._id} className="border-none hover:bg-gray-50 transition-colors">
                                        <td className="font-bold text-gray-700">{req.assetName}</td>
                                        <td className="text-gray-400 text-sm">{new Date(req.requestDate).toLocaleDateString()}</td>
                                        <td>
                                            <span className={`badge badge-sm font-bold p-3 ${
                                                req.requestStatus === 'pending' ? 'badge-warning' : 
                                                req.requestStatus === 'approved' ? 'badge-success' : 'badge-error'
                                            }`}>
                                                {req.requestStatus}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Reusable Stat Card
const StatCard = ({ title, value, icon, color }) => (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-md transition-all group">
        <div className={`${color} p-4 rounded-2xl text-white text-2xl transition-transform group-hover:scale-110 shadow-lg`}>
            {icon}
        </div>
        <div>
            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">{title}</p>
            <h3 className="text-2xl font-black text-gray-800">{value}</h3>
        </div>
    </div>
);

export default EmployeeHome;