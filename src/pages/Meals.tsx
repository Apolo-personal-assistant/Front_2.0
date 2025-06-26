import React from "react";
import { useUser } from "@/hooks/useUser";
import { Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Loader from "@/components/ui/Loader";
import { getMeals } from "@/lib/api";
import { FaUtensils, FaCalendarAlt } from "react-icons/fa";
import FadeIn from "@/components/animations/FadeIn";

interface Meal {
  _id: string;
  name: string;
  description: string;
  date: string;
  calories?: number;
  created_at?: string;
}

const MealsPage: React.FC = () => {
  const { user } = useUser();
  if (!user) return <Navigate to="/login" />;

  const {
    data: meals = [],
    isLoading,
    isError,
  } = useQuery<Meal[]>({
    queryKey: ["user-meals"],
    queryFn: getMeals,
  });

  return (
    <div className="min-h-screen px-6 py-10 bg-gradient-to-b from-white to-gray-100 dark:from-gray-950 dark:to-gray-900 text-gray-800 dark:text-white font-sans">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Header */}
        <FadeIn direction="up" delay={0.1}>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold leading-tight tracking-tight">
                Tus Comidas Registradas
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Gestiona tu historial nutricional y visualiza tu progreso.
              </p>
            </div>
            <Button variant="primary">Agregar comida</Button>
          </div>
        </FadeIn>

        {/* Loader */}
        {isLoading && (
          <div className="flex justify-center py-10">
            <Loader />
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !isError && meals.length === 0 && (
          <FadeIn delay={0.2}>
            <div className="text-center py-10">
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Aún no has registrado ninguna comida.
              </p>
            </div>
          </FadeIn>
        )}

        {/* Meal Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {meals.map((meal, index) => (
            <FadeIn key={meal._id} delay={index * 0.1}>
              <Card className="hover:shadow-2xl transition-all duration-300">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <FaUtensils className="text-2xl text-primary" />
                    <h2 className="text-xl font-semibold">{meal.name}</h2>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                    {meal.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <FaCalendarAlt className="text-base" />
                    Fecha: {new Date(meal.date).toLocaleDateString()}
                  </div>
                  {meal.calories && (
                    <div className="text-sm font-medium text-amber-600 dark:text-amber-400">
                      {meal.calories} kcal
                    </div>
                  )}
                </div>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MealsPage;
