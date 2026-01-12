// import React from 'react';
// import { TailSpin } from 'react-loader-spinner';

// const LoadingSpinner = () => {
//     return (
//         <div className="w-full h-screen inset-0 z-50 flex items-center justify-center  backdrop-blur-sm cursor-wait">
//             <div className='flex flex-col items-center justify-center gap-4'>
//                 <div>
//                     <TailSpin
//                         visible={true}
//                         height="80"
//                         width="80"
//                         color="#2563EB"
//                         ariaLabel="tail-spin-loading"
//                         radius="2"
//                         wrapperStyle={{}}
//                         wrapperClass=""
//                     />
//                 </div>
//                 <p className="text-lg font-heading font-medium text-primary animate-pulse">
//                     Loading AssetVerse...
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default LoadingSpinner;


// V--2

import React from 'react';
import { motion } from 'framer-motion';
import LogoFull from '../Components/Logo/LogoFull';

const LoadingSpinner = ({ fullScreen = true }) => {
    return (
        <div className={`relative min-h-screen flex flex-col items-center justify-center bg-transparent ${fullScreen ? 'fixed inset-0 z-[9999]' : 'h-full w-full py-20'}`}>
            
            {/* Background Gradient Spot (Subtle Glow) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-600/20 rounded-full blur-[100px] animate-pulse"></div>

            <div className="relative flex items-center justify-center">
                
                {/* --- RING 1: Outer Slow Orbit (Blue) --- */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="absolute w-32 h-32 rounded-full border-[3px] border-blue-500/20 border-t-blue-500 border-r-blue-500"
                />

                {/* --- RING 2: Inner Fast Reverse Orbit (Indigo) --- */}
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute w-24 h-24 rounded-full border-[3px] border-indigo-500/20 border-b-indigo-400 border-l-indigo-400"
                />

                {/* --- CENTER: Pulsing Logo --- */}
                <motion.div
                    animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="relative z-10 p-4 bg-slate-900 rounded-full shadow-2xl shadow-blue-900/50"
                >
                    {/* Ensure LogoFull accepts styling or wrap it */}
                    <div className="w-10 h-10 flex items-center justify-center brightness-0 invert">
                         <LogoFull className="h-full w-auto" />
                    </div>
                </motion.div>

            </div>

            {/* --- LOADING TEXT --- */}
            <motion.p 
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="mt-12 text-blue-200 font-bold text-sm uppercase tracking-[0.3em] "
            >
                Loading System...
            </motion.p>

        </div>
    );
};

export default LoadingSpinner;