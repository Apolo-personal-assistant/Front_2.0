import { motion } from "framer-motion";
import React from "react";

interface SlideInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  from?: "left" | "right" | "top" | "bottom";
  className?: string;
  distance?: number;
}

const directionMap = {
  left: { x: -100, y: 0 },
  right: { x: 100, y: 0 },
  top: { x: 0, y: -100 },
  bottom: { x: 0, y: 100 },
};

const SlideIn: React.FC<SlideInProps> = ({
  children,
  delay = 0.1,
  duration = 0.6,
  from = "left",
  className = "",
  distance = 100,
}) => {
  const initial = {
    x: directionMap[from].x ? directionMap[from].x * (distance / 100) : 0,
    y: directionMap[from].y ? directionMap[from].y * (distance / 100) : 0,
    opacity: 0,
  };

  return (
    <motion.div
      initial={initial}
      animate={{ x: 0, y: 0, opacity: 1 }}
      transition={{
        duration,
        delay,
        ease: [0.42, 0, 0.58, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default SlideIn;
