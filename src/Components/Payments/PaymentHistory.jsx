import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaFileInvoiceDollar, FaCalendarAlt, FaHashtag, FaBox, FaHistory } from 'react-icons/fa';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import LoadingSpinner from '../../Utilities/LoadingSpinner';

const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: payments = [], isLoading } = useQuery({
        queryKey: ['payment-history', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user.email}`);
            return res.data;
        }
    });

    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <title>Billing History | AssetVerse</title>

            {/* --- HEADER --- */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                <div className="space-y-1">
                    <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Billing History</h2>
                    <p className="text-slate-500 font-medium">View all your past transactions and subscription upgrades.</p>
                </div>
                <div className="bg-emerald-50 px-6 py-3 rounded-2xl border border-emerald-100 hidden lg:block">
                    <div className="flex items-center gap-3">
                        <FaHistory className="text-emerald-600" />
                        <span className="text-sm font-bold text-emerald-900">{payments.length} Transactions</span>
                    </div>
                </div>
            </div>

            {/* --- TABLE SECTION --- */}
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden">
                {payments.length === 0 ? (
                    // Empty State
                    <div className="flex flex-col items-center justify-center py-24 text-center">
                        <div className="bg-slate-50 p-6 rounded-full mb-4">
                            <FaFileInvoiceDollar size={48} className="text-slate-300" />
                        </div>
                        <h3 className="text-xl font-black text-slate-700">No invoices found</h3>
                        <p className="text-slate-400 font-medium mt-1">You haven't made any purchases yet.</p>
                    </div>
                ) : (
                    // Data Table
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr className="bg-slate-50/80 text-slate-400 uppercase text-[11px] font-black tracking-widest border-b border-slate-100 h-14">
                                    <th className="pl-8">Package Details</th>
                                    <th>Transaction ID</th>
                                    <th>Date</th>
                                    <th className="text-right pr-8">Amount</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {payments.map((payment) => (
                                    <tr key={payment._id} className="hover:bg-slate-50/50 transition-colors group">
                                        
                                        {/* Package Info */}
                                        <td className="pl-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="p-3 bg-indigo-50 text-indigo-500 rounded-xl shadow-sm">
                                                    <FaBox />
                                                </div>
                                                <div>
                                                    <div className="font-black text-slate-700 text-base">{payment.packageName}</div>
                                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">
                                                        Limit: {payment.employeeLimit} Members
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Transaction ID */}
                                        <td>
                                            <div className="flex items-center gap-2 font-mono text-xs text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg w-fit border border-slate-200">
                                                <FaHashtag size={10} className="text-slate-400" />
                                                {payment.transactionId.split('_')[1]}
                                            </div>
                                        </td>

                                        {/* Date */}
                                        <td>
                                            <div className="flex items-center gap-2 text-slate-500 font-bold text-sm">
                                                <FaCalendarAlt className="text-slate-300" size={12} />
                                                {new Date(payment.paymentDate).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric'
                                                })}
                                            </div>
                                        </td>

                                        {/* Amount */}
                                        <td className="text-right pr-8">
                                            <span className="text-lg font-black text-emerald-600">
                                                ${payment.amount}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PaymentHistory;