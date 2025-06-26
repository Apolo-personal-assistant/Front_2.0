import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth debe usarse dentro de <AuthProvider>");
  }

  return {
    user: context.user,
    loading: context.loading,
    login: context.login,
    register: context.register,
    logout: context.logout,
    isAuthenticated: !!context.user,
    isAdmin: context.user?.role === "admin",
  };
};

