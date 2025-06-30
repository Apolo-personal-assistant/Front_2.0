import React from "react";
import { motion } from "framer-motion";

interface ProgressBarProps {
  label?: string;
  value: number;
  goal: number;
  color?: string;
  unit?: string; // <- opcional para mostrar g, kcal, etc.
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  label = "Progreso",
  value,
  goal,
  color = "bg-blue-600",
  unit = "kcal", // por defecto calorías
}) => {
  const percentage = Math.min((value / goal) * 100, 100);
  const remaining = Math.max(goal - value, 0);

  return (
    <div className="w-full space-y-1">
      <div className="flex justify-between text-sm text-gray-700 dark:text-gray-300 font-medium">
        <span>{label}</span>
        <span>
          {value} / {goal} {unit}
        </span>
      </div>

      <div className="w-full h-4 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden shadow-inner">
        <motion.div
          className={`h-full ${color} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        />
      </div>

      {remaining > 0 && (
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Faltan {remaining} {unit} para alcanzar tu meta
        </p>
      )}
    </div>
  );
};

export default ProgressBar;
