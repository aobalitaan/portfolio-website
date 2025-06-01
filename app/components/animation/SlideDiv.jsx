"use client";

import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
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
  animateOnce = true,
  type = "bottom",
  delay = 0,
  className = "",
}) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: animateOnce,
    rootMargin: "0% 0% -10% 0%", // top, right, bottom, left
  });

  useEffect(() => {
    if (inView) {
      controls.start({
        x: 0,
        y: 0,
        opacity: 1,
        transition: {
          type: "spring",
          stiffness: 100,
          damping: 12,
          mass: 1.75,
          delay,
        },
      });
    } else if (!animateOnce) {
      controls.start(getInitial(type));
    }
  }, [inView, controls, animateOnce, type, delay]);

  return (
    <motion.div
      ref={ref}
      initial={getInitial(type)}
      animate={controls}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default SlideDiv;
