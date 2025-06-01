"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

const getInitial = (type) => {
  switch (type) {
  case "left":
    return { x: -100, opacity: 0 };
  case "right":
    return { x: 100, opacity: 0 };
  case "top":
    return { y: -100, opacity: 0 };
  case "bottom":
    return { y: 100, opacity: 0 };
  default:
    return { opacity: 0 };
  }
};

const SlideDiv = ({
  children,
  show = true,
  type = "bottom",
  delay = 0,
  className = "",
}) => {
  const controls = useAnimation();

  useEffect(() => {
    if (show) {
      controls.start({
        x: 0,
        y: 0,
        opacity: 1,
        transition: {
          type: "spring",
          stiffness: 200,
          damping: 20,
          mass: 1.75,
          delay,
        },
      });
    } else {
      controls.start(getInitial(type));
    }
  }, [show, controls, type, delay]);

  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={getInitial(type)}
        animate={controls}
        className="h-full w-full"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default SlideDiv;
