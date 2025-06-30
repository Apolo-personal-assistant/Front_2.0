import React, { useState } from "react";
import { useUser } from "@/hooks/useUser";
import { Navigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getMeals, createMeal, generateTodaySummary } from "@/lib/api";
import AddMealModal from "@/components/modals/AddMealModal";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Loader from "@/components/ui/Loader";
import FadeIn from "@/components/animations/FadeIn";
import Header from "@/components/layout/Header";
import {
  FaUtensils,
  FaCalendarAlt,
  FaPlusCircle,
  FaSearch,
  FaFire,
} from "react-icons/fa";

interface Meal {
  _id: string;
  meal_type: string;
  datetime: string;
  raw_text?: string;
  feedback?: string;
  calories?: number;
  created_at?: string;
  user_id: string;
}

const MealsPage: React.FC = () => {
  const { user } = useUser();
  if (!user) return <Navigate to="/login" />;

  const queryClient = useQueryClient();
  const { data: meals = [], isLoading, isError } = useQuery<Meal[]>({
    queryKey: ["user-meals"],
    queryFn: getMeals,
  });

  const [search, setSearch] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);

  const filteredMeals = meals.filter(
    (meal) =>
      typeof meal.meal_type === "string" &&
      meal.meal_type.toLowerCase().includes(search.toLowerCase())
  );

  const totalCalories = meals.reduce((sum, m) => sum + (m.calories || 0), 0);

  const handleSaveMeal = async (newMeal: {
    meal_type: string;
    datetime: string;
    raw_text?: string;
    feedback?: string;
    calories?: number;
  }) => {
    await createMeal(newMeal);

    // Verifica si la comida es para hoy
    const mealDate = new Date(newMeal.datetime);
    const today = new Date();
    const isToday =
      mealDate.getFullYear() === today.getFullYear() &&
      mealDate.getMonth() === today.getMonth() &&
      mealDate.getDate() === today.getDate();

    if (isToday) {
      await generateTodaySummary();
    }

    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ["user-meals"] }),
      queryClient.invalidateQueries({ queryKey: ["daily-summary"] }),
    ]);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-gray-950 dark:to-gray-900 text-gray-800 dark:text-white font-sans">
      <Header />

      <main className="flex-1 w-full px-0 py-12">
        <div className="max-w-6xl mx-auto px-6 space-y-12">
          <FadeIn direction="up" delay={0.1}>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-4xl font-extrabold tracking-tight">
                  Tus Comidas
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Registra y gestiona tu historial nutricional.
                </p>
              </div>
              <Button
                variant="primary"
                className="flex items-center gap-2"
                onClick={() => setModalOpen(true)}
              >
                <FaPlusCircle className="text-base" />
                Agregar comida
              </Button>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar comidas..."
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <FaSearch className="absolute left-3 top-3.5 text-gray-400 dark:text-gray-500" />
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                <h3 className="text-lg font-semibold">Total de comidas</h3>
                <p className="text-3xl font-bold">{meals.length}</p>
              </Card>
              <Card className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                <h3 className="text-lg font-semibold">Calorías totales</h3>
                <p className="text-3xl font-bold">{totalCalories} kcal</p>
              </Card>
            </div>
          </FadeIn>

          {isLoading && (
            <div className="flex justify-center py-20">
              <Loader />
            </div>
          )}

          {!isLoading && !isError && filteredMeals.length === 0 && (
            <FadeIn delay={0.4}>
              <div className="text-center py-20">
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  No hay comidas registradas con ese nombre.
                </p>
              </div>
            </FadeIn>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMeals.map((meal, index) => (
              <FadeIn key={meal._id || index} delay={index * 0.08}>
                <Card className="hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <FaUtensils className="text-xl text-primary" />
                      <h2 className="text-lg font-semibold">
                        {meal.meal_type}
                      </h2>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                      {meal.raw_text}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <FaCalendarAlt className="text-base" />
                      {new Date(meal.datetime).toLocaleDateString()}
                    </div>
                    {meal.calories !== undefined && (
                      <div className="flex items-center gap-1 text-sm text-amber-500 dark:text-amber-400 font-medium">
                        <FaFire className="text-base" />
                        {meal.calories} kcal
                      </div>
                    )}
                  </div>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </main>

      <AddMealModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveMeal}
      />
    </div>
  );
};

export default MealsPage;
