"use client";

import { motion } from "framer-motion";

const FadeScroll = ({ show, children, className = "" }) => {
  return (
    <motion.div
      className={className}
      animate={{
        opacity: show ? 1 : 0,
        scale: show ? 1 : 0.8 // Scale down to 0.8 when not shown
      }}
      transition={{ duration: 0.25 }}
      style={{ pointerEvents: show ? "auto" : "none" }} // Prevent interaction when hidden
    >
      {children}
    </motion.div>
  );
};

export default FadeScroll;