import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../Hooks/useAuth';
import useAxiosSecure from '../Hooks/useAxiosSecure';


const SNOOZE_TIME = 30 * 60 * 1000; // 30 minutes
const STORAGE_KEY = 'limit_warning_dismissed';

const LimitWarning = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [isVisible, setIsVisible] = useState(false);

    // Fetch user stats
    const { data: stats = {}, isLoading } = useQuery({
        queryKey: ['limit-check', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`);
            return res.data;
        },
        refetchInterval: 30000, // every 30 seconds
    });

    useEffect(() => {
        if (isLoading || !stats) return;

        const currentEmployees = Number(stats.currentEmployees ?? 0);
        const packageLimit = Number(stats.packageLimit ?? 0);
        const isHr = stats.role === 'hr';

        // ✅ Correct condition
        const limitReached = currentEmployees >= packageLimit;

        // If not HR or limit not reached → hide
        if (!isHr || !limitReached) {
            setIsVisible(false);
            return;
        }

        const dismissedTime = localStorage.getItem(STORAGE_KEY);

        // Never dismissed → show immediately
        if (!dismissedTime) {
            setIsVisible(true);
            return;
        }

        const elapsed = Date.now() - Number(dismissedTime);

        // 30 minutes passed → show again
        if (elapsed >= SNOOZE_TIME) {
            setIsVisible(true);
        } else {
            // ⏱ Re-show exactly after remaining time
            const timeout = setTimeout(() => {
                setIsVisible(true);
            }, SNOOZE_TIME - elapsed);

            return () => clearTimeout(timeout);
        }
    }, [stats, isLoading]);

    const handleDismiss = () => {
        localStorage.setItem(STORAGE_KEY, Date.now().toString());
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 shadow-md relative mb-6 mx-4 rounded-r-lg mt-4 z-10">
            <div className="flex items-start">
                <div className="flex-shrink-0">
                    <svg
                        className="h-6 w-6 text-red-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                    </svg>
                </div>

                <div className="ml-3 w-full">
                    <h3 className="text-sm font-bold text-red-800 uppercase">
                        Action Required: Employee Limit Reached
                    </h3>

                    <p className="mt-2 text-sm text-red-700">
                        You have used{' '}
                        <b>{stats.currentEmployees}</b> out of{' '}
                        <b>{stats.packageLimit}</b> employee slots.
                        Please upgrade your package to add more employees.
                    </p>

                    <div className="mt-4">
                        <Link
                            to="/dashboard/package-upgrade"
                            className="btn btn-sm btn-error text-white font-bold"
                        >
                            Upgrade Now
                        </Link>
                    </div>
                </div>

                <button
                    onClick={handleDismiss}
                    className="ml-4 hover:bg-red-200 p-1 rounded-full"
                >
                    <svg
                        className="h-5 w-5 text-red-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default LimitWarning;
