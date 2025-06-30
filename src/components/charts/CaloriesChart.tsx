import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LabelList,
} from "recharts";
import { motion } from "framer-motion";
import React from "react";

export interface CaloriesChartProps {
  daily: number;
  goal: number;
}

const CaloriesChart: React.FC<CaloriesChartProps> = ({ daily, goal }) => {
  const data = [
    {
      day: "Hoy",
      calories: daily,
      goal: goal,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.42, 0, 0.58, 1] }}
      className="w-full h-72 bg-white dark:bg-gray-900 rounded-xl shadow-md p-4"
    >
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
        Calorías consumidas vs meta
      </h2>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="day" stroke="#9ca3af" />
          <YAxis stroke="#9ca3af" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1f2937",
              border: "none",
              color: "#fff",
              borderRadius: "0.5rem",
            }}
          />
          <Bar dataKey="goal" fill="#cbd5e1" radius={[6, 6, 0, 0]} />
          <Bar dataKey="calories" fill="#4F46E5" radius={[6, 6, 0, 0]}>
            <LabelList dataKey="calories" position="top" fill="#4F46E5" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default CaloriesChart;