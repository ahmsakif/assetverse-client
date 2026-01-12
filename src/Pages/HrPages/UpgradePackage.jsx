import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { FaCheck, FaCrown, FaRocket, FaUserFriends, FaTimes } from 'react-icons/fa';
import Swal from 'sweetalert2';

const UpgradePackage = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [loadingPkg, setLoadingPkg] = useState(null);

    // 1. Fetch User Info
    const { data: userData = {} } = useQuery({
        queryKey: ['user-info', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`);
            return res.data;
        },
    });

    // 2. Fetch Packages (Sorted by price ensures visual progression)
    const { data: packages = [], isLoading } = useQuery({
        queryKey: ['packages'],
        queryFn: async () => {
            const res = await axiosSecure.get('/packages');
            return res.data.sort((a, b) => a.price - b.price);
        },
    });

    const currentPackageName = userData.subscription;

    // 3. Payment Handler
    const handleBuy = async (pkg) => {
        setLoadingPkg(pkg._id);
        try {
            const res = await axiosSecure.post('/create-checkout-session', {
                price: pkg.price,
                packageName: pkg.name,
                employeeLimit: pkg.employeeLimit,
                hrEmail: user.email,
            });

            if (res.data?.url) {
                window.location.href = res.data.url;
            }
        } catch (err) {
            console.error('Payment Error:', err);
            Swal.fire({
                title: 'Payment Failed',
                text: 'Could not initialize checkout session.',
                icon: 'error'
            });
            setLoadingPkg(null);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <div className="py-12 px-4 animate-in fade-in duration-700">
            <title>Upgrade Plan | AssetVerse</title>

            {/* --- HEADER --- */}
            <div className="text-center max-w-3xl mx-auto mb-16">
                <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-indigo-50 text-indigo-600 font-bold text-xs uppercase tracking-widest">
                    Pricing Plans
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight mb-4">
                    Scale your team with the <br /> <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-indigo-600">Perfect Plan</span>
                </h2>
                <p className="text-lg text-slate-500 font-medium">
                    Choose a plan that fits your company size. Upgrade instantly to increase your employee capacity.
                </p>
            </div>

            {/* --- PRICING GRID --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[1440px] mx-auto items-start">
                {packages.map((pkg, index) => {
                    const isCurrent = pkg.name === currentPackageName;

                    // Logic to check if this package is "lower" than current
                    // We find the current package object to compare limits
                    const currentPkgObj = packages.find(p => p.name === currentPackageName);
                    const isLowerPlan = currentPkgObj && pkg.employeeLimit < currentPkgObj.employeeLimit;

                    // Highlight the "middle" plan or the highest plan as popular/premium
                    const isRecommended = index === 1;

                    return (
                        <div
                            key={pkg._id}
                            className={`relative flex flex-col p-8 rounded-[2.5rem] transition-all duration-300 ${isCurrent
                                    ? 'bg-white border-2 border-primary ring-4 ring-primary/10 shadow-xl scale-105 z-10'
                                    : 'bg-white border border-slate-100 shadow-lg hover:shadow-xl hover:border-slate-200 hover:-translate-y-1'
                                } ${isLowerPlan ? 'opacity-70 grayscale-[0.5]' : ''}`}
                        >
                            {/* Recommended Badge */}
                            {isRecommended && !isCurrent && !isLowerPlan && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-slate-800 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
                                    Best Value
                                </div>
                            )}

                            {/* Current Plan Badge */}
                            {isCurrent && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg flex items-center gap-2">
                                    <FaCheck size={10} /> Active Plan
                                </div>
                            )}

                            {/* Header */}
                            <div className="mb-6">
                                <h3 className="text-lg font-black text-slate-400 uppercase tracking-widest mb-2">{pkg.name}</h3>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-black text-slate-800">${pkg.price}</span>
                                    <span className="text-slate-400 font-bold">/ month</span>
                                </div>
                            </div>

                            {/* Capacity Highlight */}
                            <div className="bg-slate-50 rounded-2xl p-4 mb-8 flex items-center gap-4 border border-slate-100">
                                <div className={`p-3 rounded-xl ${isCurrent ? 'bg-primary text-white' : 'bg-white text-slate-400 shadow-sm'}`}>
                                    <FaUserFriends size={20} />
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Team Capacity</p>
                                    <p className="text-lg font-black text-slate-800">{pkg.employeeLimit} Members</p>
                                </div>
                            </div>

                            {/* Features List */}
                            <div className="flex-1 mb-8">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">What's included</p>
                                <ul className="space-y-4">
                                    {/* Mock features if none exist in DB, or map existing */}
                                    {pkg.features && pkg.features.length > 0 ? (
                                        pkg.features.map((feature, idx) => (
                                            <FeatureRow key={idx} text={feature} active={!isLowerPlan} />
                                        ))
                                    ) : (
                                        <>
                                            <FeatureRow text="Asset Management" active={!isLowerPlan} />
                                            <FeatureRow text={`Up to ${pkg.employeeLimit} Employees`} active={!isLowerPlan} />
                                            <FeatureRow text="HR Admin Dashboard" active={!isLowerPlan} />
                                            <FeatureRow text="Standard Support" active={pkg.price > 5} />
                                            <FeatureRow text="Priority Analytics" active={pkg.price > 10} />
                                        </>
                                    )}
                                </ul>
                            </div>

                            {/* Action Button */}
                            <div className="mt-auto">
                                {isCurrent ? (
                                    <button disabled className="btn btn-lg w-full rounded-2xl bg-slate-100 text-slate-400 border-none font-black uppercase tracking-widest">
                                        Current Plan
                                    </button>
                                ) : isLowerPlan ? (
                                    <button disabled className="btn btn-lg w-full rounded-2xl bg-slate-50 text-slate-300 border-none font-black uppercase tracking-widest">
                                        Unavailable
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleBuy(pkg)}
                                        disabled={loadingPkg === pkg._id}
                                        className="btn btn-primary btn-lg w-full rounded-2xl shadow-xl shadow-primary/30 hover:shadow-primary/50 font-black uppercase tracking-widest transition-all hover:scale-[1.02]"
                                    >
                                        {loadingPkg === pkg._id ? (
                                            <span className="loading loading-spinner"></span>
                                        ) : (
                                            <>Upgrade Now <FaRocket className="ml-2" /></>
                                        )}
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* --- TRUST FOOTER --- */}
            <div className="text-center mt-20 pb-10 border-t border-slate-100 pt-10">
                <p className="text-slate-400 font-medium text-sm">
                    Secure payment processing powered by <span className="font-bold text-slate-600">Stripe</span>.
                    <br />Need a custom enterprise plan? <a href="#" className="text-primary hover:underline">Contact Sales</a>.
                </p>
            </div>
        </div>
    );
};

// Helper Component for List Items
const FeatureRow = ({ text, active }) => (
    <li className={`flex items-start gap-3 ${active ? 'text-slate-600' : 'text-slate-300'}`}>
        <div className={`mt-0.5 min-w-[1.25rem]`}>
            {active ? <FaCheck className="text-emerald-500" size={14} /> : <FaTimes size={14} />}
        </div>
        <span className="text-sm font-bold leading-tight">{text}</span>
    </li>
);

export default UpgradePackage;