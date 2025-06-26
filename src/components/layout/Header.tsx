import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";
import { useUser } from "../../hooks/useUser";
import { Avatar } from "../ui/Avatar";


const Header: React.FC = () => {
  const { logout } = useAuth();
  const { user } = useUser();

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.42, 0, 0.58, 1] }}
      className="w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm"
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <img src="/logo.svg" alt="NutriTrack Logo" className="h-7" />
          <span className="text-xl font-bold text-brand">NutriTrack</span>
        </Link>

        <div className="flex items-center space-x-4">
          <span className="hidden sm:block text-sm text-gray-700 dark:text-gray-300 font-medium">
            {user?.name ?? "Usuario"}
          </span>

          <Avatar src={user?.avatarUrl} alt={user?.name} />

          <button
            onClick={logout}
            className="text-gray-500 hover:text-red-500 transition-colors"
            title="Cerrar sesión"
          >
            <FaSignOutAlt className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
