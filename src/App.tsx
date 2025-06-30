import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import "./styles/globals.css";
import Spinner from "./components/ui/Loader";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

// Lazy load de páginas
const LoginPage = lazy(() => import("./pages/Login"));
const RegisterPage = lazy(() => import("./pages/Register"));
const DashboardPage = lazy(() => import("./pages/Dashboard"));
const ProfilePage = lazy(() => import("./pages/Profile"));
const SummaryPage = lazy(() => import("./pages/Summary"));
const GoalsPage = lazy(() => import("./pages/Goals"));
const MealsPage = lazy(() => import("./pages/Meals"));
const AdminDashboardPage = lazy(() => import("./pages/AdminDashboard")); // Opcional si aplica

// Página 404
const NotFoundPage = () => (
  <div className="flex flex-col items-center justify-center h-screen text-center px-6">
    <h1 className="text-5xl font-extrabold text-primary mb-4">404</h1>
    <p className="text-lg text-gray-600 dark:text-gray-400">Página no encontrada</p>
    <a
      href="/"
      className="mt-6 inline-block px-6 py-2 rounded-lg bg-primary text-white hover:bg-primary-dark transition"
    >
      Volver al inicio
    </a>
  </div>
);

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white font-sans">
          <Suspense fallback={<div className="flex justify-center pt-20"><Spinner /></div>}>
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
              <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
              <Route path="/summary" element={<PrivateRoute><SummaryPage /></PrivateRoute>} />
              <Route path="/goals" element={<PrivateRoute><GoalsPage /></PrivateRoute>} />
              <Route path="/meals" element={<PrivateRoute><MealsPage /></PrivateRoute>} />
              <Route path="/admin-dashboard" element={<PrivateRoute><AdminDashboardPage /></PrivateRoute>} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
