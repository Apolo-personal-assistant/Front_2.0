import React from "react";
import { useUser } from "../hooks/useUser";
import { Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import Card from "../components/ui/Card";
import Avatar from "../components/ui/Avatar";
import { getUsers, getAiLogs } from "../lib/api";
import { useQuery } from "@tanstack/react-query";
import { FaUsers, FaRobot } from "react-icons/fa";

interface User {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  created_at?: string;
}

interface AiLog {
  _id: string;
  user_id: string;
  prompt: string;
  created_at?: string;
}

const AdminDashboard: React.FC = () => {
  const { user, isAdmin } = useUser();

  if (!isAdmin) return <Navigate to="/dashboard" />;

  const {
    data: users = [],
    isLoading: loadingUsers,
  } = useQuery<User[]>({
    queryKey: ["admin-users"],
    queryFn: getUsers,
  });

  const {
    data: logs = [],
    isLoading: loadingLogs,
  } = useQuery<AiLog[]>({
    queryKey: ["admin-ai-logs"],
    queryFn: getAiLogs,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.42, 0, 0.58, 1] }}
      className="min-h-screen px-6 py-10 bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-white font-sans"
    >
      <div className="max-w-6xl mx-auto space-y-10">
        <h1 className="text-3xl font-bold tracking-tight">Panel de Administración</h1>

        {/* Métricas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
            <Card className="hover:shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Usuarios registrados</p>
                  <h2 className="text-3xl font-bold">
                    {loadingUsers ? "..." : users.length}
                  </h2>
                </div>
                <FaUsers className="text-4xl text-primary" />
              </div>
            </Card>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
            <Card className="hover:shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Logs IA registrados</p>
                  <h2 className="text-3xl font-bold">
                    {loadingLogs ? "..." : logs.length}
                  </h2>
                </div>
                <FaRobot className="text-4xl text-primary" />
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Tabla de usuarios */}
        <Card title="Últimos usuarios">
          <div className="overflow-x-auto rounded-lg">
            <table className="min-w-full text-sm text-left table-auto border-collapse">
              <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                <tr>
                  <th className="px-4 py-3 font-medium">Nombre</th>
                  <th className="px-4 py-3 font-medium">Email</th>
                  <th className="px-4 py-3 font-medium">Rol</th>
                  <th className="px-4 py-3 font-medium">Registro</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {users.slice(0, 5).map((u: User) => (
                  <tr
                    key={u._id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                  >
                    <td className="px-4 py-3 flex items-center gap-2">
                      <Avatar name={u.name} />
                      <span>{u.name}</span>
                    </td>
                    <td className="px-4 py-3">{u.email}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${
                          u.role === "admin"
                            ? "bg-red-100 text-red-700 dark:bg-red-800/20 dark:text-red-300"
                            : "bg-green-100 text-green-700 dark:bg-green-800/20 dark:text-green-300"
                        }`}
                      >
                        {u.role}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                      {new Date(u.created_at || "").toLocaleDateString()}
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

export default AdminDashboard;
