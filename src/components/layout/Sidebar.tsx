import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHome, FaUtensils, FaBullseye, FaChartPie, FaUserShield } from "react-icons/fa";
import { useUser } from "../../hooks/useUser";
import React from "react";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: <FaHome /> },
  { to: "/meals", label: "Comidas", icon: <FaUtensils /> },
  { to: "/goals", label: "Metas", icon: <FaBullseye /> },
  { to: "/summary", label: "Resumen", icon: <FaChartPie /> },
];

const Sidebar: React.FC = () => {
  const { user } = useUser();

  return (
    <motion.aside
      initial={{ x: -40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className="hidden md:flex flex-col w-64 h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 shadow-sm fixed left-0 top-0 z-20"
    >
      {/* Logo */}
      <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-800">
        <img src="/logo.svg" alt="NutriTrack Logo" className="h-6 mb-1" />
        <h1 className="text-lg font-bold text-brand">NutriTrack</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navItems.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-brand text-white"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`
            }
          >
            <span className="text-lg">{icon}</span>
            <span>{label}</span>
          </NavLink>
        ))}

        {user?.role === "admin" && (
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-red-600 text-white"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`
            }
          >
            <FaUserShield className="text-lg" />
            <span>Admin</span>
          </NavLink>
        )}
      </nav>
    </motion.aside>
  );
};

export default Sidebar;
