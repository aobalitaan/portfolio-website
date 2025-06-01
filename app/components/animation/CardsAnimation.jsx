import { motion, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";
import projectList from "@/app/utils/ProjectList";

const CardsAnimation = ({
  children,
  className = "transition-all duration-100 ease-in-out",
  translateDistance = 350,
  rotateAmount = 10,
  index,
  show,
  toggledisableSwitch,
  changeHoveredCard,
}) => {
  const mult = Math.floor(projectList.length / 2 - index);

  // Create springs once
  const springX = useSpring(0, { stiffness: 200, damping: 30 });
  const springRotate = useSpring(0, { stiffness: 200, damping: 30 });




  const targetX = show ? 0 : translateDistance * mult;
  const targetRotate = show ? 0 : -rotateAmount * mult;
  const targetFilter = show
    ? "brightness(1) blur(0px)"
    : `brightness(${1.0 - mult / 10})`;


  const timeoutRef = useRef(null);
  // Update spring targets when `show` or index changes
  useEffect(() => {

    setTimeout(() => {
      springX.set(targetX);
      springRotate.set(targetRotate);
    }, 100);

    if (!show) {
      // Clear any existing timeout and disable immediately
      clearTimeout(timeoutRef.current);
      toggledisableSwitch?.(true);
      changeHoveredCard?.(null);
    } else {
      // Wait 250ms before enabling again
      timeoutRef.current = setTimeout(() => {
        toggledisableSwitch?.(false);
      }, 500);
    }

    // Cleanup
    return () => clearTimeout(timeoutRef.current);
  }, [show]);

  return (
    <motion.div
      style={{
        x: springX,
        rotate: springRotate,
        filter: targetFilter,
        transformOrigin: "center",
        willChange: "transform, filter",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default CardsAnimation;
