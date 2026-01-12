import React from 'react';
import { Link, useNavigate } from 'react-router';

const ErrorPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-center">
            
            {/* --- Illustration / Icon --- */}
            <div className="relative mb-8">
                {/* Background Blob */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-blue-100 rounded-full blur-3xl opacity-60"></div>
                
                {/* Main 404 Text */}
                <h1 className="relative text-[150px] font-black text-blue-900 leading-none select-none">
                    404
                </h1>
            </div>

            {/* --- Message --- */}
            <div className="max-w-md space-y-4 relative z-10">
                <h2 className="text-3xl font-bold text-gray-800">
                    Result Not Found
                </h2>
                <p className="text-gray-500">
                    Oops! It looks like the page you are looking for has been moved, deleted, or is currently out of stock.
                </p>

                {/* --- Action Buttons --- */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                    <button 
                        onClick={() => navigate(-1)} 
                        className="btn btn-outline border-gray-300 text-gray-600 hover:bg-gray-100 hover:text-gray-900 hover:border-gray-400"
                    >
                        Go Back
                    </button>
                    
                    <Link 
                        to="/" 
                        className="btn btn-primary text-white shadow-lg shadow-blue-500/30"
                    >
                        Return to Home
                    </Link>
                </div>
            </div>

            {/* --- Footer Decoration --- */}
            <div className="mt-16 text-sm text-gray-400">
                Error Code: 404_PAGE_MISSING
            </div>
        </div>
    );
};

export default ErrorPage;