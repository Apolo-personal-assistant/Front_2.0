import React from "react";
import { motion } from "framer-motion";
import { FaUser } from "react-icons/fa";

interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: "sm" | "md" | "lg";
  ring?: boolean;
}

const sizeMap = {
  sm: "w-8 h-8 text-sm",
  md: "w-10 h-10 text-base",
  lg: "w-14 h-14 text-lg",
};

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = "Avatar",
  name,
  size = "md",
  ring = true,
}) => {
  const classes = `${sizeMap[size]} rounded-full overflow-hidden flex items-center justify-center bg-gray-300 dark:bg-gray-600 ${
    ring ? "ring-2 ring-brand/60 dark:ring-brand" : ""
  }`;

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
      className={classes}
    >
      {src ? (
        <img src={src} alt={alt} className="object-cover w-full h-full" />
      ) : name ? (
        <span className="text-white font-semibold">{name.charAt(0).toUpperCase()}</span>
      ) : (
        <FaUser className="text-gray-500 dark:text-gray-300" />
      )}
    </motion.div>
  );
};

export default Avatar;
