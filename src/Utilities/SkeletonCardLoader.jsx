import React from 'react';

const SkeletonCardLoader = () => {
    return (
        <div className="card bg-base-100 shadow-xl border border-base-200">
            {/* Figure / Avatar Skeleton */}
            <figure className="px-6 pt-6">
                <div className="avatar">
                    <div className="w-32 h-32 rounded-full skeleton"></div>
                </div>
            </figure>

            <div className="card-body items-center text-center">
                {/* Name Skeleton */}
                <div className="skeleton h-6 w-3/4 mb-2"></div>

                {/* Email Skeleton */}
                <div className="skeleton h-4 w-1/2 mb-4"></div>

                {/* Badges Skeleton */}
                <div className="flex gap-2 flex-wrap justify-center mb-4">
                    <div className="skeleton h-6 w-20 rounded-full"></div>
                    <div className="skeleton h-6 w-24 rounded-full"></div>
                </div>

                {/* Details Box Skeleton */}
                <div className="w-full h-10 skeleton rounded-lg mb-4 opacity-50"></div>

                {/* Button Skeleton */}
                <div className="card-actions w-full">
                    <div className="skeleton h-8 w-full rounded-md"></div>
                </div>
            </div>
        </div>
    );
};

export default SkeletonCardLoader;