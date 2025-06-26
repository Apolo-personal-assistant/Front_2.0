import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import "./styles/globals.css";

import Spinner from "./components/ui/Loader";

const LoginPage = lazy(() => import("./pages/Login"));
const RegisterPage = lazy(() => import("./pages/Register"));
const ProfilePage = lazy(() => import("./pages/Profile"));
const SummaryPage = lazy(() => import("./pages/Summary"));

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
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white font-sans">
        <main className="flex-1 py-10 px-4 md:px-12 lg:px-24">
          <Suspense fallback={<div className="flex justify-center pt-20"><Spinner /></div>}>
            <Routes>
              <Route path="/" element={<Navigate to="/profile" replace />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/summary" element={<SummaryPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
