import React, { useState } from "react";
import { useUser } from "../hooks/useUser";
import { Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import FadeIn from "../components/animations/FadeIn";

import {
  FaUserCircle,
  FaEnvelope,
  FaShieldAlt,
  FaTrophy,
  FaClock,
  FaUtensils,
  FaRobot,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { getGoals, getMeals, getAiLogs } from  "../lib/api";

type AiLog = {
  prompt: string;
  response: string;
  created_at?: string;
  timestamp?: string;
};

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

  const { data: logs = [], isLoading: logsLoading } = useQuery<AiLog[]>({
    queryKey: ["user-ai-logs"],
    queryFn: getAiLogs,
  });

  const [expandedLog, setExpandedLog] = useState<number | null>(null);
  const toggleLog = (index: number) => {
    setExpandedLog((prev) => (prev === index ? null : index));
  };

  const goalsCount = goals.length;
  const mealsCount = meals.length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-gray-950 dark:to-gray-900 text-gray-800 dark:text-white px-6 py-10 font-sans">
      <div className="max-w-5xl mx-auto space-y-10">

        {/* Header */}
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

        {/* Perfil */}
        <FadeIn delay={0.1}>
          <Card className="flex flex-col sm:flex-row items-center gap-6 p-6">
            <FaUserCircle className="text-6xl text-primary" />
            <div className="space-y-2 w-full">
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-gray-500 dark:text-gray-400" />
                <span className="text-base">{user.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <FaShieldAlt className="text-gray-500 dark:text-gray-400" />
                <span className="capitalize text-base">Rol: {user.role}</span>
              </div>
              <div className="flex items-center gap-3">
                <FaClock className="text-gray-500 dark:text-gray-400" />
                <span className="text-base">
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
                  {goalsLoading ? "..." : `${goalsCount} Metas Alcanzadas`}
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
                  {mealsLoading ? "..." : `${mealsCount} Comidas Registradas`}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Buen seguimiento de tu nutrición
                </p>
              </div>
            </Card>
          </div>
        </FadeIn>

        {/* Historial IA */}
        <FadeIn delay={0.3}>
          <div className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <FaRobot className="text-primary" />
              Actividad Reciente de IA
            </h2>
            {logsLoading ? (
              <p className="text-gray-500 dark:text-gray-400">Cargando historial...</p>
            ) : logs.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400">
                Aún no hay interacciones con el asistente.
              </p>
            ) : (
              <div className="space-y-2 max-h-80 overflow-y-auto pr-2">
                {logs.slice(0, 5).map((log, i) => {
                  const isOpen = expandedLog === i;
                  return (
                    <Card key={i} className="p-4">
                      <div
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() => toggleLog(i)}
                      >
                        <div className="text-sm font-medium text-primary">
                          {log.prompt.length > 50 ? log.prompt.slice(0, 50) + "..." : log.prompt}
                        </div>
                        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                      </div>
                      {isOpen && (
                        <div className="mt-3 space-y-2 text-sm">
                          <p className="text-gray-200 font-semibold">Respuesta:</p>
                          <p className="text-gray-100 dark:text-gray-300 whitespace-pre-wrap">
                            {log.response || "No se registró respuesta"}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {log.timestamp || log.created_at
                              ? new Date(log.timestamp ?? log.created_at!).toLocaleString()
                              : "Fecha no disponible"}
                          </p>
                        </div>
                      )}
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </FadeIn>

        {/* Logout */}
        <FadeIn delay={0.4}>
          <div className="text-center pt-6">
            <Button variant="danger" onClick={() => (window.location.href = "/logout")}>
              Cerrar Sesión
            </Button>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

export default ProfilePage;
