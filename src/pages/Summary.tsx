import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getSummaries } from "@/lib/api";
import FadeIn from "@/components/animations/FadeIn";
import Card from "@/components/ui/Card";
import {
  FaCalendarAlt,
  FaCheckCircle,
  FaFireAlt,
  FaWeight,
  FaAppleAlt,
} from "react-icons/fa";

const SummaryPage: React.FC = () => {
  const { data = [], isLoading, error } = useQuery({
    queryKey: ["daily-summary"],
    queryFn: getSummaries,
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-gray-950 dark:to-gray-900 px-6 py-10 text-gray-800 dark:text-white font-sans">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header */}
        <FadeIn direction="up">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight">Resumen Diario</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Mira el progreso de tu salud y alimentación cada día
            </p>
          </div>
        </FadeIn>

        {/* Contenido */}
        <FadeIn delay={0.1}>
          {isLoading ? (
            <p className="text-center text-gray-500 dark:text-gray-400">Cargando resumen...</p>
          ) : error ? (
            <p className="text-center text-red-500">Error al cargar el resumen</p>
          ) : data.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400">
              No hay registros para mostrar todavía.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.slice(0, 10).map((summary: any, i: number) => (
                <Card key={i} className="p-6 space-y-4">
                  <div className="flex items-center gap-3 text-primary">
                    <FaCalendarAlt className="text-xl" />
                    <h2 className="text-lg font-semibold">
                      {new Date(summary.date).toLocaleDateString()}
                    </h2>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <FaFireAlt className="text-orange-500" />
                      <span>Calorías: {summary.total_calories}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaAppleAlt className="text-green-500" />
                      <span>Comidas: {summary.total_meals}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaWeight className="text-pink-400" />
                      <span>Peso: {summary.weight ?? "No registrado"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaCheckCircle className="text-emerald-500" />
                      <span>Meta cumplida: {summary.goal_met ? "Sí" : "No"}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </FadeIn>
      </div>
    </div>
  );
};

export default SummaryPage;
