import React from "react";
import { useUser } from "@/hooks/useUser";
import { Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import Card from "@/components/ui/Card";
import Avatar from "@/components/ui/Avatar";
import { getAiLogs } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { FaRobot, FaRegClock } from "react-icons/fa";
import { FiActivity } from "react-icons/fi";
import { MdHistory } from "react-icons/md";

interface AiLog {
  _id: string;
  user_id: string;
  prompt: string;
  created_at?: string;
}

const Dashboard: React.FC = () => {
  const { user } = useUser();

  if (!user) return <Navigate to="/login" />;

  const {
    data: allLogs = [],
    isLoading: loadingLogs,
  } = useQuery<AiLog[]>({
    queryKey: ["user-ai-logs"],
    queryFn: getAiLogs,
  });

  // ✅ Filtrar logs del usuario actual
  const logs = allLogs.filter((log) => log.user_id === user._id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.42, 0, 0.58, 1] }}
      className="min-h-screen px-6 py-10 bg-gradient-to-b from-white to-gray-100 dark:from-gray-950 dark:to-gray-900 text-gray-800 dark:text-white font-sans"
    >
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-4"
        >
          <Avatar src={user.avatarUrl} alt={user.name} size="lg" />
          <div>
            <h1 className="text-3xl font-bold tracking-tight leading-snug">
              Bienvenido de nuevo, {user.name}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Aquí puedes revisar tu actividad más reciente con la IA
            </p>
          </div>
        </motion.div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <motion.div whileHover={{ scale: 1.03 }}>
            <Card className="hover:shadow-2xl transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Interacciones totales</p>
                  <h2 className="text-3xl font-bold">
                    {loadingLogs ? "..." : logs.length}
                  </h2>
                </div>
                <FaRobot className="text-4xl text-primary" />
              </div>
            </Card>
          </motion.div>

          <motion.div whileHover={{ scale: 1.03 }}>
            <Card className="hover:shadow-2xl transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Actividad reciente</p>
                  <h2 className="text-3xl font-bold">
                    {loadingLogs ? "..." : logs[0]?.prompt.length || 0}
                  </h2>
                </div>
                <FiActivity className="text-4xl text-emerald-500" />
              </div>
            </Card>
          </motion.div>

          <motion.div whileHover={{ scale: 1.03 }}>
            <Card className="hover:shadow-2xl transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Última interacción</p>
                  <h2 className="text-3xl font-bold">
                    {loadingLogs ? "..." : new Date(logs[0]?.created_at || "").toLocaleDateString()}
                  </h2>
                </div>
                <MdHistory className="text-4xl text-indigo-500" />
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Historial */}
        <Card title="Historial reciente de prompts">
          <div className="overflow-x-auto rounded-lg">
            <table className="min-w-full text-sm text-left table-auto border-collapse">
              <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                <tr>
                  <th className="px-4 py-3 font-medium">Prompt</th>
                  <th className="px-4 py-3 font-medium">Fecha</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {logs.slice(0, 5).map((log) => (
                  <tr
                    key={log._id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                  >
                    <td className="px-4 py-3 max-w-[400px] truncate">{log.prompt}</td>
                    <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                      <FaRegClock />
                      {new Date(log.created_at || "").toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </motion.div>
  );
};

export default Dashboard;
