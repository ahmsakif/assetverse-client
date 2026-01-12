import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure.jsx';
import LoadingSpinner from '../../Utilities/LoadingSpinner';
import { FaBirthdayCake, FaUsers, FaBuilding, FaEnvelope, FaShieldAlt } from 'react-icons/fa';

const MyTeam = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [selectedCompanyId, setSelectedCompanyId] = useState(null);

    // 1. Fetch User's Company Affiliations
    const { data: companies = [], isLoading: companiesLoading } = useQuery({
        queryKey: ['my-affiliations', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get('/my-affiliations', {
                params: { email: user.email }
            });
            return res.data;
        }
    });

    // Auto-select first company
    useEffect(() => {
        if (companies.length > 0 && !selectedCompanyId) {
            setSelectedCompanyId(companies[0].hrEmail);
        }
    }, [companies, selectedCompanyId]);

    // 2. Fetch Team Members
    const { data: teamMembers = [], isLoading: teamLoading } = useQuery({
        queryKey: ['team-members', user?.email, selectedCompanyId],
        enabled: !!user?.email && !!selectedCompanyId,
        queryFn: async () => {
            const res = await axiosSecure.get('/team-members', {
                params: { email: user.email, hrEmail: selectedCompanyId }
            });
            return res.data;
        }
    });

    // Birthday Logic
    const currentMonth = new Date().getMonth();
    const upcomingBirthdays = teamMembers.filter(member => {
        if (!member.dateOfBirth) return false;
        return new Date(member.dateOfBirth).getMonth() === currentMonth;
    });

    if (companiesLoading) return <LoadingSpinner />;

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <title>My Team | AssetVerse</title>

            {/* --- TOP HEADER --- */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <div className="space-y-1">
                    <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Team Colleagues</h2>
                    <p className="text-slate-500 font-medium">Connect with your team members across affiliated companies.</p>
                </div>

                {/* --- 🏢 COMPANY SWITCHER TABS --- */}
                {companies.length > 0 && (
                    <div className="tabs tabs-boxed bg-slate-50 p-1 border border-slate-200 rounded-2xl">
                        {companies.map(company => (
                            <button
                                key={company._id}
                                className={`tab tab-lg gap-2 transition-all duration-300 rounded-xl px-6 font-bold ${
                                    selectedCompanyId === company.hrEmail 
                                    ? 'bg-primary text-white shadow-lg shadow-primary/30' 
                                    : 'text-slate-500 hover:bg-slate-200'
                                }`}
                                onClick={() => setSelectedCompanyId(company.hrEmail)}
                            >
                                {company.companyLogo && (
                                    <img src={company.companyLogo} alt="logo" className="w-5 h-5 rounded-full bg-white shadow-sm" />
                                )}
                                <span className="text-sm">{company.companyName}</span>
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <div className="flex flex-col xl:flex-row gap-8 items-start">
                {/* --- LEFT: TEAM GRID --- */}
                <div className="flex-1 w-full">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><FaUsers /></div>
                        <h3 className="text-xl font-bold text-slate-800 uppercase tracking-wider text-sm">Team Members ({teamMembers.length})</h3>
                    </div>

                    {teamLoading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[...Array(6)].map((_, i) => <div key={i} className="skeleton h-32 w-full rounded-3xl"></div>)}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                            {teamMembers.map((member, idx) => (
                                <div key={idx} className="group bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300">
                                    <div className="flex items-center gap-5">
                                        <div className="avatar">
                                            <div className="w-16 h-16 rounded-2xl ring-2 ring-slate-50 ring-offset-2 group-hover:scale-105 transition-transform">
                                                <img src={member.image || "https://i.ibb.co/pL1p6w4/user.png"} alt={member.name} />
                                            </div>
                                        </div>
                                        <div className="space-y-1 overflow-hidden">
                                            <h4 className="font-black text-slate-800 truncate">{member.name}</h4>
                                            <p className="text-xs text-slate-400 flex items-center gap-1 truncate">
                                                <FaEnvelope size={10} /> {member.email}
                                            </p>
                                            <div className={`badge badge-sm font-bold gap-1 px-3 ${
                                                member.role === 'admin' ? 'badge-secondary text-white' : 'badge-ghost text-slate-400'
                                            }`}>
                                                {member.role === 'admin' ? <><FaShieldAlt size={10}/> Admin</> : 'Member'}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* --- RIGHT: BIRTHDAY SIDEBAR --- */}
                <div className="w-full xl:w-96 sticky top-24">
                    <div className="bg-gradient-to-br from-indigo-600 to-blue-700 text-white rounded-[2rem] p-8 shadow-2xl shadow-blue-200 overflow-hidden relative">
                        {/* Decorative background circle */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
                        
                        <div className="relative z-10">
                            <h2 className="text-2xl font-black flex items-center gap-3 mb-2">
                                <FaBirthdayCake className="animate-bounce" /> Birthdays
                            </h2>
                            <p className="text-blue-100 text-sm font-medium mb-8">
                                Celebrations in {new Date().toLocaleString('default', { month: 'long' })}
                            </p>

                            {upcomingBirthdays.length === 0 ? (
                                <div className="text-center py-10 bg-white/10 rounded-2xl border border-white/20">
                                    <p className="text-white/80 font-medium">No celebrations this month.</p>
                                </div>
                            ) : (
                                <ul className="space-y-4">
                                    {upcomingBirthdays.map((member, idx) => (
                                        <li key={idx} className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10 hover:bg-white/20 transition-colors">
                                            <div className="avatar">
                                                <div className="w-12 rounded-xl ring-2 ring-white/20">
                                                    <img src={member.image || "https://i.ibb.co/pL1p6w4/user.png"} alt="Avatar" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-black">{member.name}</div>
                                                <div className="text-xs font-bold text-blue-200 uppercase tracking-widest flex items-center gap-1">
                                                    {new Date(member.dateOfBirth).getDate()}
                                                    {['st', 'nd', 'rd'][((new Date(member.dateOfBirth).getDate() + 90) % 100 - 10) % 10 - 1] || 'th'}
                                                    <span className="opacity-60">• Happy Birthday!</span>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default MyTeam;