import { motion } from 'framer-motion';
import React from 'react';

const SlideLeft = ({ children }) => {
    return (
        <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="space-y-4"
        >
            {children}
        </motion.div>
    );
};

export default SlideLeft;