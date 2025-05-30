'use client';

import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function ParallaxSection({
  children,
  speed = 1,
  className = '', animateOnce = true, 
  entrance = "right",
}) {
  const ref = useRef(null);

  const isInView = useInView(ref, { once: animateOnce, margin: '-10% 0px' });

  const { scrollY } = useScroll();
  const offsetY = useTransform(scrollY, (value) => value * (1 - speed));
  const smoothY = useSpring(offsetY, { stiffness: 100, damping: 30 });

  // Entrance animation map
  const entranceVariants = {
    left: { initial: { opacity: 0, x: -100 }, animate: { opacity: 1, x: 0 } },
    right: { initial: { opacity: 0, x: 100 }, animate: { opacity: 1, x: 0 } },
    bottom: { initial: { opacity: 0, y: 60 }, animate: { opacity: 1, y: 0 } },
  };

  const { initial, animate } = entranceVariants[entrance] || entranceVariants.right;

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ y: isInView ? smoothY : 0 }}
      initial={initial}
      animate={isInView ? animate : {}}
      transition={{ delay: 0.250, duration: 1, type: 'spring', bounce: 0.15 }}
    >
      {children}
    </motion.div>
  );
}
