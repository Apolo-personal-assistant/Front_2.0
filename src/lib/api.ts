import axios from "axios";
import type { User } from "../context/AuthContext";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Interceptor global para adjuntar el token automáticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Tipo de usuario recibido del backend
type RawUser = Omit<User, "id"> & { _id: string };

// ─── AUTH ───────────────────────────────────────────────────────────────────

export const login = async (email: string, password: string) => {
  const formData = new URLSearchParams();
  formData.append("username", email);
  formData.append("password", password);

  const res = await api.post("/auth/login", formData, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  const { access_token } = res.data;
  localStorage.setItem("token", access_token);
  return access_token;
};

export const register = async (full_name: string, email: string, password: string) => {
  const res = await api.post("/auth/register", {
    full_name,
    email,
    password,
  });
  return res.data;
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const getCurrentUser = async (): Promise<User> => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  const parseJwt = (token: string) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };

  const payload = parseJwt(token);
  const userId = payload?.sub;
  if (!userId) throw new Error("User ID not found in token");

  const res = await api.get<RawUser>(`/users/${userId}`);
  const raw = res.data;
  return {
    id: raw._id,
    full_name: raw.full_name,
    email: raw.email,
    role: raw.role,
    created_at: raw.created_at,
    avatarUrl: raw.avatarUrl,
  };
};

// ─── USUARIOS ────────────────────────────────────────────────────────────────

export const getUsers = async (): Promise<User[]> => {
  const res = await api.get<RawUser[]>("/users");
  return res.data.map((raw) => ({
    id: raw._id,
    full_name: raw.full_name,
    email: raw.email,
    role: raw.role,
    created_at: raw.created_at,
    avatarUrl: raw.avatarUrl,
  }));
};

export const getUser = async (id: string): Promise<User> => {
  const res = await api.get<RawUser>(`/users/${id}`);
  const raw = res.data;
  return {
    id: raw._id,
    full_name: raw.full_name,
    email: raw.email,
    role: raw.role,
    created_at: raw.created_at,
    avatarUrl: raw.avatarUrl,
  };
};

export const createUser = async (user: Omit<User, "id">): Promise<User> => {
  const res = await api.post<RawUser>("/users", user);
  const raw = res.data;
  return {
    id: raw._id,
    full_name: raw.full_name,
    email: raw.email,
    role: raw.role,
    created_at: raw.created_at,
    avatarUrl: raw.avatarUrl,
  };
};

export const updateUser = async (
  id: string,
  updates: Partial<User>
): Promise<User> => {
  const res = await api.put<RawUser>(`/users/${id}`, updates);
  const raw = res.data;
  return {
    id: raw._id,
    full_name: raw.full_name,
    email: raw.email,
    role: raw.role,
    created_at: raw.created_at,
    avatarUrl: raw.avatarUrl,
  };
};

export const deleteUser = async (id: string): Promise<void> => {
  await api.delete(`/users/${id}`);
};

// ─── COMIDAS ─────────────────────────────────────────────────────────────────


export const getMeals = async () => {
  const res = await api.get("/meals");
  return res.data;
};

export const getMeal = async (id: string) => {
  const res = await api.get(`/meals/${id}`);
  return res.data;
};

export const createMeal = async (meal: {
  meal_type: string;
  datetime: string;
  raw_text?: string;
  feedback?: string;
  calories?: number;
}) => {
  const res = await api.post("/meals", meal);
  return res.data;
};


// ─── METAS ──────────────────────────────────────────────────────────────────

export interface GoalInput {
  title: string;
  description: string;
  type: string; 
  frequency: string; 
  deadline?: string;
  calories_goal?: number;
  protein_goal?: number;
  carbs_goal?: number;
  fat_goal?: number;
  active?: boolean;
}

export const getGoals = async () => {
  const res = await api.get("/goals");
  return res.data;
};

export const createGoal = async (goal: GoalInput) => {
  const res = await api.post("/goals", goal);
  return res.data;
};

// ─── RESÚMENES DIARIOS ──────────────────────────────────────────────────────

export const getSummaries = async () => {
  const res = await api.get("/daily_summary");
  return res.data;
};

// ─── CATÁLOGO DE ALIMENTOS ───────────────────────────────────────────────────

export const getFoods = async () => {
  const res = await api.get("/foods_catalog");
  return res.data;
};

// ─── HISTORIAL DE IA ────────────────────────────────────────────────────────

export const getAiLogs = async () => {
  const res = await api.get("/ai_logs");
  return res.data;
};

export const createAiLog = async (log: any) => {
  const res = await api.post("/ai_logs", log);
  return res.data;
};

// ─── PROGRESO DEL USUARIO ────────────────────────────────────────────────────

export const getProgressSummary = async () => {
  const res = await api.get("/daily_summary/progress");
  return res.data;
};





export const generateTodaySummary = async () => {
  try {
    const res = await api.post("/daily_summary/auto-generate");
    return res.data; 
  } catch (error: any) {
    if (error.response && error.response.status === 400) {
      console.warn("No se pudo generar resumen diario:", error.response.data?.detail);
    } else {
      console.error("Error al generar resumen diario:", error);
    }
    return null; 
  }
};
