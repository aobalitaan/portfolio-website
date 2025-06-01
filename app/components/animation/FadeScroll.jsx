'use client';

import { motion, AnimatePresence } from 'framer-motion';

const FadeScroll = ({ show, children, className = '' }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className={className}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FadeScroll;
