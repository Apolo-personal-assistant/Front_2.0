import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import type { User } from "../context/AuthContext";

export const useUser = (): {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
} => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useUser debe usarse dentro de <AuthProvider>");
  }

  const { user } = context;

  return {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
  };
};
