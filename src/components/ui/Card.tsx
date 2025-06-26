import React from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  animated?: boolean;
  shadow?: boolean;
}

const Card: React.FC<CardProps> = ({
  title,
  children,
  className = "",
  animated = true,
  shadow = true,
}) => {
  const cardContent = (
    <div
      className={clsx(
        "bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6",
        shadow && "shadow-md dark:shadow-none",
        className
      )}
    >
      {title && (
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          {title}
        </h3>
      )}
      {children}
    </div>
  );

  return animated ? (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
    >
      {cardContent}
    </motion.div>
  ) : (
    <>{cardContent}</>
  );
};

export default Card;
