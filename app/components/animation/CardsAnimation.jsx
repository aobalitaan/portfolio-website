import { motion, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";

const CardsAnimation = ({
  children,
  className = "",
  translateDistance = 400,
  rotateAmount = 10,
  index,
  length = 1,
  show,
  toggledisableSwitch,
  changeHoveredCard,
}) => {
  // Fan the deck symmetrically about its midpoint. Must not floor: with an even
  // card count the offsets are halves, and flooring pins the last card to 0 so
  // it never animates.
  const mult = (length - 1) / 2 - index;

  const springX = useSpring(0, { stiffness: 200, damping: 35 });
  const springRotate = useSpring(0, { stiffness: 200, damping: 35 });

  const targetX = show ? 0 : translateDistance * mult;
  const targetRotate = show ? 0 : -rotateAmount * mult;
  const targetFilter = show
    ? "brightness(1) blur(0px)"
    : `brightness(${1.0 - Math.abs(mult) / 10})`;


  const timeoutRef = useRef(null);
  useEffect(() => {

    setTimeout(() => {
      springX.set(targetX);
      springRotate.set(targetRotate);
    }, 100);

    if (!show) {
      clearTimeout(timeoutRef.current);
      toggledisableSwitch?.(true);
      changeHoveredCard?.(null);
    } else {
      timeoutRef.current = setTimeout(() => {
        toggledisableSwitch?.(false);
      }, 500);
    }

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
      className={`${className} ${show ? "" : "scale-75 md:scale-80"} transition-transform duration-250 ease-out`}
    >
      {children}
    </motion.div>
  );
};

export default CardsAnimation;
