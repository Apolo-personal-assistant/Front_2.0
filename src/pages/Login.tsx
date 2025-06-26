
import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../components/ui/Button";
import Loader from "../components/ui/Loader";
import { FaLock, FaUser } from "react-icons/fa";

const LoginPage: React.FC = () => {
  const { login, isAuthenticated, loading } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await login(form.email, form.password);
    } catch (err) {
      setError("Credenciales inválidas o error de conexión.");
    }
  };

  if (isAuthenticated) return <Navigate to="/dashboard" />;

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 text-gray-800 dark:text-white px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md space-y-6"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6, ease: [0.42, 0, 0.58, 1] }}
      >
        <h2 className="text-3xl font-extrabold text-center tracking-tight">
          Iniciar Sesión
        </h2>
        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
          Bienvenido de vuelta. Ingresa tus credenciales.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <div className="relative">
              <FaUser className="absolute top-3 left-3 text-gray-400" />
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="usuario@correo.com"
                className="pl-10 w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Contraseña</label>
            <div className="relative">
              <FaLock className="absolute top-3 left-3 text-gray-400" />
              <input
                type="password"
                name="password"
                required
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="pl-10 w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-500 font-medium text-center">{error}</p>
          )}

          <Button type="submit" variant="primary" className="w-full" disabled={loading}>
            {loading ? <Loader /> : "Ingresar"}
          </Button>
        </form>

        <div className="text-center text-sm text-gray-400 pt-4">
          ¿No tienes cuenta? <span className="underline cursor-pointer text-primary hover:text-primary-dark">Regístrate</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LoginPage;
