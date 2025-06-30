import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getSummaries, generateTodaySummary } from "@/lib/api";
import FadeIn from "@/components/animations/FadeIn";
import Card from "@/components/ui/Card";
import Header from "@/components/layout/Header";
import CaloriesChart from "@/components/charts/CaloriesChart";
import NutrientPieChart from "@/components/charts/NutrientPieChart";
import ProgressBar from "@/components/charts/ProgressBar";
import {
  FaCalendarAlt,
  FaCheckCircle,
  FaFireAlt,
  FaWeight,
  FaAppleAlt,
} from "react-icons/fa";

interface DailySummary {
  date: string;
  total_calories: number;
  total_meals: number;
  weight?: number;
  goal_met: boolean;
  nutrients?: {
    protein: number;
    carbs: number;
    fat: number;
  };
  goal?: number;
}

const SummaryPage: React.FC = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    generateTodaySummary().finally(() => setReady(true));
  }, []);

  const { data = [], isLoading, error } = useQuery<DailySummary[]>({
    queryKey: ["daily-summary"],
    queryFn: getSummaries,
    enabled: ready,
  });

  const today = data?.find((summary) => {
    const todayDate = new Date().toDateString();
    return new Date(summary.date).toDateString() === todayDate;
  });

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-gray-950 dark:to-gray-900 text-gray-800 dark:text-white font-sans">
      <Header />
      <main className="flex-1 pt-24 px-6 pb-10">
        <div className="max-w-5xl mx-auto space-y-10">
          <FadeIn direction="up">
            <div className="text-center">
              <h1 className="text-3xl font-bold tracking-tight">Resumen Diario</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Mira el progreso de tu salud y alimentación cada día
              </p>
            </div>
          </FadeIn>

          {isLoading || !ready ? (
            <p className="text-center text-gray-500 dark:text-gray-400">Cargando resumen...</p>
          ) : error ? (
            <p className="text-center text-red-500">Error al cargar el resumen</p>
          ) : data.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400">
              No hay registros para mostrar todavía.
            </p>
          ) : (
            <>
              {/* Resumen de hoy con gráficas */}
              {today && (
                <FadeIn delay={0.1}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <CaloriesChart
                      daily={today.total_calories}
                      goal={today.goal ?? 2000}
                    />
                    <NutrientPieChart nutrients={today.nutrients ?? {
                      protein: 60,
                      carbs: 220,
                      fat: 70
                    }} />
                    <Card className="p-6 space-y-4 md:col-span-2">
                      <ProgressBar
                        label="Calorías consumidas"
                        value={today.total_calories}
                        goal={today.goal ?? 2000}
                        unit="kcal"
                      />
                    </Card>
                  </div>
                </FadeIn>
              )}

              {/* Histórico de resúmenes */}
              <FadeIn delay={0.2}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {data.map((summary, i) => (
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
                          <span>
                            Peso: {summary.weight ?? "No registrado"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FaCheckCircle className="text-emerald-500" />
                          <span>
                            Meta cumplida: {summary.goal_met ? "Sí" : "No"}
                          </span>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </FadeIn>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default SummaryPage;
