// src/components/PrivateRoute.tsx
import React, { JSX } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

type Props = {
  children: JSX.Element;
};

const PrivateRoute: React.FC<Props> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div className="text-center mt-8">Cargando...</div>;

  return user ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
