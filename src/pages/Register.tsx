import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../lib/api";
import { motion } from "framer-motion";
import {
  FaUserPlus,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
} from "react-icons/fa";
import logo from "../assets/illustrations/logo.png";
import Button from "../components/ui/Button";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (form.password !== form.confirm) {
      setError("Las contraseñas no coinciden");
      return;
    }
    try {
      setLoading(true);
      await register(form.full_name, form.email, form.password);
      setSuccess(true);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError("Ocurrió un error al registrar. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950 px-4 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
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
          Crear Cuenta
        </h2>
        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
          Regístrate para comenzar a usar la plataforma
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">Nombre completo</label>
            <input
              type="text"
              name="full_name"
              required
              value={form.full_name}
              onChange={handleChange}
              placeholder="Tu nombre completo"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-brand text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Correo electrónico</label>
            <div className="relative">
              <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
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
                type={showPassword ? "text" : "password"}
                name="password"
                required
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="pl-10 w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-brand text-sm"
              />
              <div
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 cursor-pointer"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Confirmar contraseña</label>
            <input
              type="password"
              name="confirm"
              required
              value={form.confirm}
              onChange={handleChange}
              placeholder="Repite tu contraseña"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-brand text-sm"
            />
          </div>

          {error && (
            <p className="text-sm text-red-500 font-medium text-center">{error}</p>
          )}
          {success && (
            <p className="text-sm text-green-500 flex items-center gap-2 justify-center">
              <FaCheckCircle /> Registro exitoso. Redirigiendo...
            </p>
          )}

          <motion.div whileHover={{ scale: 1.02 }}>
            <Button
              type="submit"
              variant="primary"
              className="w-full"
              disabled={loading}
            >
              {loading ? "Registrando..." : "Registrarse"}
            </Button>
          </motion.div>
        </form>

        <div className="text-center text-sm text-gray-400 pt-2">
          ¿Ya tienes una cuenta?{" "}
          <a
            href="/login"
            className="underline text-brand hover:text-brand-dark transition font-medium"
          >
            Inicia sesión
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default RegisterPage;
