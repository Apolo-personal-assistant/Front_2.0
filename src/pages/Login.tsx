import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../components/ui/Button";
import Loader from "../components/ui/Loader";
import { FaLock, FaUser } from "react-icons/fa";
import logo from "../assets/illustrations/logo.png";

const LoginPage: React.FC = () => {
  const { login, isAuthenticated, loading } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await login(form.email, form.password);
    } catch {
      setError("Credenciales inválidas o error de conexión.");
    }
  };

  if (isAuthenticated) return <Navigate to="/dashboard" />;

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950 px-4 py-12"
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="w-full max-w-md bg-white dark:bg-gray-900 shadow-2xl rounded-3xl border border-gray-200 dark:border-gray-800 p-8 space-y-6 backdrop-blur-sm"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.42, 0, 0.58, 1] }}
      >
        {/* Logo */}
        <div className="flex justify-center mb-2">
          <img src={logo} alt="Eatmind logo" className="h-10 w-auto" />
        </div>

        <h2 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white">
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
                className="pl-10 w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-brand text-sm"
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
                className="pl-10 w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-brand text-sm"
              />
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-500 font-medium text-center">
              {error}
            </p>
          )}

          <motion.div whileHover={{ scale: 1.02 }}>
            <Button type="submit" variant="primary" className="w-full" disabled={loading}>
              {loading ? <Loader /> : "Ingresar"}
            </Button>
          </motion.div>
        </form>

        <div className="text-center text-sm text-gray-400 pt-2">
          ¿No tienes cuenta?{" "}
          <a
            href="/register"
            className="underline text-brand hover:text-brand-dark transition font-medium"
          >
            Regístrate
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LoginPage;
