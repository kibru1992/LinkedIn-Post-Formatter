import React from 'react';
import { motion } from 'framer-motion';

const FormatterCard = ({ children, title, icon: Icon, className = "" }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`glass-card p-5 ${className}`}
        >
            <div className="flex items-center gap-3 mb-4">
                {Icon && (
                    <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
                        <Icon size={20} />
                    </div>
                )}
                <h2 className="text-sm font-bold text-white uppercase tracking-wider">{title}</h2>
            </div>
            {children}
        </motion.div>
    );
};

export default FormatterCard;
