import React from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  leftIcon,
  fullWidth = true,
  className,
  ...props
}) => {
  return (
    <div className={clsx("space-y-1", fullWidth && "w-full")}>
      {label && (
        <label
          htmlFor={props.id || props.name}
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {label}
        </label>
      )}

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
        className={clsx(
          "flex items-center rounded-xl px-3 py-2 border transition-all duration-200",
          error
            ? "border-red-500 focus-within:ring-red-500"
            : "border-gray-300 dark:border-gray-700 focus-within:ring-brand focus-within:ring-2",
          fullWidth && "w-full",
          className
        )}
      >
        {leftIcon && <span className="mr-2 text-gray-500">{leftIcon}</span>}
        <input
          {...props}
          className={clsx(
            "bg-transparent outline-none w-full text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
          )}
        />
      </motion.div>

      {error && (
        <p className="text-xs text-red-500 mt-1">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
