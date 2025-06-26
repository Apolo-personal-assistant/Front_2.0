import { motion } from "framer-motion";
import React from "react";

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
}

const variantsMap = {
  up: { y: 20, opacity: 0 },
  down: { y: -20, opacity: 0 },
  left: { x: 20, opacity: 0 },
  right: { x: -20, opacity: 0 },
};

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0.1,
  duration = 0.6,
  className = "",
  direction = "up",
}) => {
  const initial = variantsMap[direction] || variantsMap.up;

  return (
    <motion.div
      initial={initial}
      animate={{ x: 0, y: 0, opacity: 1 }}
      transition={{
        duration,
        delay,
        ease: [0.4, 0.0, 0.2, 1], 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default FadeIn;
