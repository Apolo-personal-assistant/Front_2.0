import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FaSignOutAlt,
  FaHome,
  FaBullseye,
  FaUtensils,
  FaChartPie,
  FaUserCircle,
} from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";
import { useUser } from "../../hooks/useUser";
import Avatar from "../ui/Avatar";
import logo from "../../assets/illustrations/logo.png";

const navItems = [
  { route: "dashboard", icon: <FaHome title="Dashboard" /> },
  { route: "goals", icon: <FaBullseye title="Goals" /> },
  { route: "meals", icon: <FaUtensils title="Meals" /> },
  { route: "summary", icon: <FaChartPie title="Summary" /> },
  { route: "profile", icon: <FaUserCircle title="Profile" /> },
];

const Header: React.FC = () => {
  const { logout } = useAuth();
  const { user } = useUser();
  const navigate = useNavigate();

  return (
    <motion.header
      initial={{ y: -12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
      className="w-full border-b border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md shadow-sm sticky top-0 z-50"
    >
      <div className="w-full px-4 py-3 flex items-center justify-between">
        {/* Logo (izquierda) */}
        <div
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <img src={logo} alt="Eatmind" className="h-7 w-auto object-contain" />
          <span className="font-bold text-lg tracking-tight text-gray-900 dark:text-white">
            Eatmind
          </span>
        </div>

        {/* Navegación + acciones (derecha) */}
        <div className="flex items-center gap-4 ml-auto">
          {/* Botones navegación con animación */}
          <nav className="flex items-center gap-4">
            {navItems.map(({ route, icon }) => (
              <motion.button
                key={route}
                onClick={() => navigate(`/${route}`)}
                whileHover={{ scale: 1.2, rotate: 3 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="text-gray-600 dark:text-gray-300 hover:text-brand dark:hover:text-brand transition-all text-lg"
              >
                {icon}
              </motion.button>
            ))}
          </nav>

          {/* Logout con animación también */}
          <motion.button
            onClick={logout}
            title="Cerrar sesión"
            whileHover={{ scale: 1.2, rotate: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="text-gray-500 hover:text-red-500 transition-colors"
          >
            <FaSignOutAlt className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
