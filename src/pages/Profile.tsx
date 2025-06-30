import React from "react";
import { useUser } from "../hooks/useUser";
import { Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import FadeIn from "../components/animations/FadeIn";
import Header from "../components/layout/Header";

import {
  FaUserCircle,
  FaEnvelope,
  FaShieldAlt,
  FaTrophy,
  FaClock,
  FaUtensils,
} from "react-icons/fa";

import { getGoals, getMeals } from "../lib/api";

const ProfilePage: React.FC = () => {
  const { user, isAuthenticated } = useUser();
  if (!isAuthenticated || !user) return <Navigate to="/login" />;

  const { data: goals = [], isLoading: goalsLoading } = useQuery({
    queryKey: ["user-goals"],
    queryFn: getGoals,
  });

  const { data: meals = [], isLoading: mealsLoading } = useQuery({
    queryKey: ["user-meals"],
    queryFn: getMeals,
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-gray-950 dark:to-gray-900 text-gray-800 dark:text-white font-sans">
      <Header />

      <div className="max-w-5xl mx-auto px-6 py-10 space-y-10">
        {/* Título */}
        <FadeIn direction="up">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Perfil del Usuario</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Administra tus datos personales y tu cuenta
              </p>
            </div>
            <Button variant="primary">Editar Perfil</Button>
          </div>
        </FadeIn>

        {/* Datos de usuario */}
        <FadeIn delay={0.1}>
          <Card className="flex flex-col sm:flex-row items-center gap-6 p-6">
            <FaUserCircle className="text-6xl text-primary" />
            <div className="space-y-2 w-full">
              <h2 className="text-xl font-semibold">{user.full_name}</h2>
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-gray-500 dark:text-gray-400" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <FaShieldAlt className="text-gray-500 dark:text-gray-400" />
                <span className="capitalize">Rol: {user.role}</span>
              </div>
              <div className="flex items-center gap-3">
                <FaClock className="text-gray-500 dark:text-gray-400" />
                <span>
                  Registrado el{" "}
                  {user.created_at
                    ? new Date(user.created_at).toLocaleDateString()
                    : "Fecha desconocida"}
                </span>
              </div>
            </div>
          </Card>
        </FadeIn>

        {/* Métricas */}
        <FadeIn delay={0.2}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Card className="flex items-center gap-4 p-6">
              <FaTrophy className="text-3xl text-yellow-400" />
              <div>
                <h3 className="font-bold text-lg">
                  {goalsLoading ? "..." : `${goals.length} Metas Alcanzadas`}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  ¡Sigue así, estás logrando tus objetivos!
                </p>
              </div>
            </Card>
            <Card className="flex items-center gap-4 p-6">
              <FaUtensils className="text-3xl text-emerald-500" />
              <div>
                <h3 className="font-bold text-lg">
                  {mealsLoading ? "..." : `${meals.length} Comidas Registradas`}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Buen seguimiento de tu nutrición
                </p>
              </div>
            </Card>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

export default ProfilePage;
