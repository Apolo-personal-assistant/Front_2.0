import React, { useState } from "react";
import { useUser } from "@/hooks/useUser";
import { Navigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getGoals, createGoal } from "@/lib/api";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Loader from "@/components/ui/Loader";
import AddGoalModal from "@/components/modals/AddGoalModal";
import Header from "@/components/layout/Header";
import { motion } from "framer-motion";
import { FaBullseye, FaCalendarAlt, FaPlusCircle } from "react-icons/fa";

interface Goal {
  _id: string;
  title: string;
  description: string;
  type: string;
  frequency: string;
  deadline?: string;
  calories_goal?: number;
  protein_goal?: number;
  carbs_goal?: number;
  fat_goal?: number;
  active: boolean;
  created_at?: string;
}

const GoalsPage: React.FC = () => {
  const { user } = useUser();
  if (!user) return <Navigate to="/login" />;

  const [isModalOpen, setModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const {
    data: goals = [],
    isLoading,
    isError,
  } = useQuery<Goal[]>({
    queryKey: ["user-goals"],
    queryFn: getGoals,
  });

  const handleSaveGoal = async (goal: {
    title: string;
    description: string;
    type: string;
    frequency: string;
    deadline?: string;
    calories_goal?: number;
    protein_goal?: number;
    carbs_goal?: number;
    fat_goal?: number;
  }) => {
    await createGoal({ ...goal, active: true });
    setModalOpen(false);
    await queryClient.invalidateQueries({ queryKey: ["user-goals"] });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-gray-950 dark:to-gray-900 text-gray-800 dark:text-white font-sans">
      <Header />

      <main className="flex-1 w-full px-0 pt-24 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto px-6 space-y-10"
        >
          {/* Encabezado */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold leading-tight tracking-tight">
                Tus Metas Personales
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Revisa y administra tus objetivos de bienestar
              </p>
            </div>
            <Button
              variant="primary"
              className="flex items-center gap-2"
              onClick={() => setModalOpen(true)}
            >
              <FaPlusCircle className="text-base" />
              Agregar nueva meta
            </Button>
          </div>

          {/* Loader */}
          {isLoading && (
            <div className="flex justify-center py-10">
              <Loader />
            </div>
          )}

          {/* Estado vacío */}
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

          {/* Lista de metas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {goals.map((goal) => (
              <motion.div
                key={goal._id}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <FaBullseye className="text-2xl text-primary" />
                      <div>
                        <h2 className="text-xl font-semibold">{goal.title}</h2>
                        <p className="text-xs text-gray-400">
                          Tipo: {goal.type} | Frecuencia: {goal.frequency}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
                      {goal.description}
                    </p>
                    {goal.deadline && (
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <FaCalendarAlt className="text-base" />
                        Fecha límite:{" "}
                        {new Date(goal.deadline).toLocaleDateString()}
                      </div>
                    )}
                    {(goal.calories_goal || goal.protein_goal || goal.carbs_goal || goal.fat_goal) && (
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 space-y-1">
                        {goal.calories_goal && <div>🎯 Calorías: {goal.calories_goal} kcal</div>}
                        {goal.protein_goal && <div>🍗 Proteínas: {goal.protein_goal} g</div>}
                        {goal.carbs_goal && <div>🥖 Carbohidratos: {goal.carbs_goal} g</div>}
                        {goal.fat_goal && <div>🥑 Grasas: {goal.fat_goal} g</div>}
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>

      <AddGoalModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveGoal}
      />
    </div>
  );
};

export default GoalsPage;
