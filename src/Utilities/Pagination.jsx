import React from 'react';

const Pagination = ({ 
    currentPage, 
    setCurrentPage, 
    itemsPerPage, 
    totalCount 
}) => {
    
    // Calculate total pages (Always round up)
    // If totalCount is 0 or undefined, default to 1 page to prevent crash
    const numberOfPages = Math.ceil((totalCount || 0) / itemsPerPage);
    
    // Create an array of page numbers: [0, 1, 2, ...]
    const pages = [...Array(numberOfPages).keys()];

    const handlePrev = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    // If there is no data, hide pagination
    if (totalCount === 0) return null;

    return (
        <div className="flex flex-col md:flex-row justify-between items-center mt-8 gap-4 bg-base-100 p-4 rounded-lg border border-base-200 shadow-sm">
            
            {/* Left Side: Info Text */}
            <div className="text-sm text-gray-500">
                Showing page <span className="font-bold">{currentPage + 1}</span> of <span className="font-bold">{numberOfPages}</span>
            </div>

            {/* Center: Pagination Buttons */}
            <div className="join">
                <button 
                    onClick={handlePrev} 
                    className="join-item btn btn-sm"
                    disabled={currentPage === 0}
                >
                    Prev
                </button>

                {/* Map through pages to create number buttons */}
                {/* TIP: If you have 100 pages, you might want to slice this array to only show 5 at a time. 
                    For now, this renders all numbers. */}
                {pages.map((page) => (
                    <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`join-item btn btn-sm ${currentPage === page ? 'btn-primary btn-active' : ''}`}
                    >
                        {page + 1}
                    </button>
                ))}

                <button 
                    onClick={handleNext} 
                    className="join-item btn btn-sm"
                    disabled={currentPage === numberOfPages - 1}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Pagination;