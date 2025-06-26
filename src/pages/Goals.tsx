import React from "react";
import { useUser } from "@/hooks/useUser";
import { Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Loader from "@/components/ui/Loader";
import { getGoals } from "@/lib/api";
import { FaBullseye, FaCalendarAlt } from "react-icons/fa";

interface Goal {
  _id: string;
  title: string;
  description: string;
  deadline: string;
  created_at?: string;
}

const GoalsPage: React.FC = () => {
  const { user } = useUser();
  if (!user) return <Navigate to="/login" />;

  const {
    data: goals = [],
    isLoading,
    isError,
  } = useQuery<Goal[]>({
    queryKey: ["user-goals"],
    queryFn: getGoals,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen px-6 py-10 bg-gradient-to-b from-white to-gray-100 dark:from-gray-950 dark:to-gray-900 text-gray-800 dark:text-white font-sans"
    >
      <div className="max-w-5xl mx-auto space-y-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold leading-tight tracking-tight">
              Tus Metas Personales
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Revisa y administra tus objetivos de bienestar
            </p>
          </div>
          <Button variant="primary">Agregar nueva meta</Button>
        </div>

        {isLoading && (
          <div className="flex justify-center py-10">
            <Loader />
          </div>
        )}

        {!isLoading && !isError && goals.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-10"
          >
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Aún no has creado ninguna meta.
            </p>
          </motion.div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {goals.map((goal) => (
            <motion.div
              key={goal._id}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="hover:shadow-xl">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <FaBullseye className="text-2xl text-primary" />
                    <h2 className="text-xl font-semibold">{goal.title}</h2>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {goal.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <FaCalendarAlt className="text-base" />
                    Fecha límite: {new Date(goal.deadline).toLocaleDateString()}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default GoalsPage;
