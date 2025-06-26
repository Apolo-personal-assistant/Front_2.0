
import React from "react";
import { motion } from "framer-motion";

const Loader: React.FC = () => {
  return (
    <div className="flex items-center justify-center w-full h-full py-20">
      <motion.div
        className="relative flex space-x-2"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.15,
              repeat: Infinity,
              repeatType: "loop",
            },
          },
        }}
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="w-4 h-4 rounded-full bg-primary dark:bg-primary-dark"
            variants={{
              hidden: { y: 0, opacity: 0.5 },
              visible: {
                y: [-6, 6, -6],
                opacity: [0.5, 1, 0.5],
                transition: {
                  duration: 0.6,
                  ease: "easeInOut",
                  repeat: Infinity,
                },
              },
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default Loader;
