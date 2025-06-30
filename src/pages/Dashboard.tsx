import React from "react";
import { useUser } from "../hooks/useUser";
import { Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { getAiLogs, getProgressSummary } from "../lib/api";

import { Flame, PieChart, Activity, History } from "lucide-react";
import Avatar from "../components/ui/Avatar";
import Card from "../components/ui/Card";
import Header from "../components/layout/Header";

import CaloriesChart from "../components/charts/CaloriesChart";
import NutrientPieChart from "../components/charts/NutrientPieChart";
import ProgressBar from "../components/charts/ProgressBar";

interface AiLog {
  _id: string;
  user_id: string;
  prompt: string;
  created_at?: string;
}

const Dashboard: React.FC = () => {
  const { user } = useUser();
  if (!user) return <Navigate to="/login" />;

  const { data: allLogs = [], isLoading } = useQuery<AiLog[]>({
    queryKey: ["user-ai-logs"],
    queryFn: getAiLogs,
  });

  const { data: summary } = useQuery({
    queryKey: ["progress-summary"],
    queryFn: getProgressSummary,
  });

  const logs = allLogs.filter((log) => log.user_id === user.id);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white font-sans">
      <Header />

      <main className="flex-1 w-full px-0 py-12">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 px-6 mb-12"
        >
          <Avatar src={user.avatarUrl} alt={user.full_name} name={user.full_name} size="lg" />
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">
              ¡Bienvenido de nuevo, {user.full_name}!
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Aquí puedes revisar tu actividad más reciente con la IA.
            </p>
          </div>
        </motion.div>

        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6 mb-12">
          <motion.div whileHover={{ scale: 1.01 }} className="transition-all">
            <Card className="bg-gray-800 hover:shadow-lg">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-400">Interacciones totales</p>
                  <h2 className="text-3xl font-bold">{isLoading ? "..." : logs.length}</h2>
                </div>
                <Flame className="w-6 h-6 text-primary" />
              </div>
            </Card>
          </motion.div>

          <motion.div whileHover={{ scale: 1.01 }} className="transition-all">
            <Card className="bg-gray-800 hover:shadow-lg">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-400">Actividad reciente</p>
                  <h2 className="text-3xl font-bold">{logs[0]?.prompt?.length || 0}</h2>
                </div>
                <Activity className="w-6 h-6 text-green-500" />
              </div>
            </Card>
          </motion.div>

          <motion.div whileHover={{ scale: 1.01 }} className="transition-all">
            <Card className="bg-gray-800 hover:shadow-lg">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-400">Última interacción</p>
                  <h2 className="text-3xl font-bold">
                    {logs[0]?.created_at ? new Date(logs[0].created_at).toLocaleDateString() : "Sin datos"}
                  </h2>
                </div>
                <History className="w-6 h-6 text-indigo-400" />
              </div>
            </Card>
          </motion.div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 mb-12">
          <Card title="Calorías consumidas hoy" className="bg-gray-800">
            <CaloriesChart daily={summary?.daily || 0} goal={summary?.goal || 2000} />
          </Card>
          <Card title="Distribución de macronutrientes" className="bg-gray-800">
            <NutrientPieChart
              nutrients={{
                protein: summary?.nutrients?.protein || 0,
                carbs: summary?.nutrients?.carbs || 0,
                fat: summary?.nutrients?.fat || 0,
              }}
            />
          </Card>
        </section>

        <section className="px-6 w-full mb-12">
          <Card title="Progreso semanal de calorías" className="bg-gray-800">
            <ProgressBar
              label="Progreso semanal de calorías"
              value={summary?.weekly || 0}
              goal={(summary?.goal || 2000) * 7}
            />
          </Card>
        </section>

        <section className="px-6 w-full">
          <Card title="Historial reciente de prompts" className="bg-gray-800">
            <div className="overflow-x-auto rounded-lg">
              <table className="min-w-full text-sm table-auto">
                <thead className="bg-gray-700 text-gray-300">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">Prompt</th>
                    <th className="px-4 py-3 text-left font-semibold">Fecha</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {logs.slice(0, 5).map((log) => (
                    <tr key={log._id} className="hover:bg-gray-700/50 transition-colors">
                      <td className="px-4 py-2 truncate max-w-[400px]">{log.prompt}</td>
                      <td className="px-4 py-2 text-gray-400">
                        {new Date(log.created_at || "").toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                  {logs.length === 0 && (
                    <tr>
                      <td colSpan={2} className="px-4 py-3 text-center text-gray-500">
                        No hay prompts recientes aún.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
