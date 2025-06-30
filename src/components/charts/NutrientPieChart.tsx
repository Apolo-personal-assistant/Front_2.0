import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { motion } from "framer-motion";
import React from "react";

export interface Nutrients {
  protein: number;
  carbs: number;
  fat: number;
}

export interface NutrientPieChartProps {
  nutrients: Nutrients;
}

const COLORS = ["#4F46E5", "#10B981", "#F59E0B"];

const NutrientPieChart: React.FC<NutrientPieChartProps> = ({ nutrients }) => {
  const { protein, carbs, fat } = nutrients;

  const data = [
    { name: "Proteínas", value: protein },
    { name: "Carbohidratos", value: carbs },
    { name: "Grasas", value: fat },
  ];

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
      className="w-full h-72 bg-white dark:bg-gray-900 rounded-xl shadow-md p-4"
    >
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
        Distribución de macronutrientes
      </h2>

      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) =>
              percent !== undefined ? `${name} ${(percent * 100).toFixed(0)}%` : name
            }
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) => `${value}g`}
            contentStyle={{
              backgroundColor: "#1f2937",
              border: "none",
              borderRadius: "0.5rem",
              color: "#fff",
            }}
          />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default NutrientPieChart;
