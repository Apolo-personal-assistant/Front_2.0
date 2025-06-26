import axios from "axios";
import type { User } from "../context/AuthContext";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

//
// ─── USUARIOS ────────────────────────────────────────────────────────────────
//

export const getUsers = async (): Promise<User[]> => {
  const res = await api.get("/users");
  return res.data;
};

export const getUser = async (id: string): Promise<User> => {
  const res = await api.get(`/users/${id}`);
  return res.data;
};

export const createUser = async (user: Omit<User, "_id">): Promise<User> => {
  const res = await api.post("/users", user);
  return res.data;
};

export const updateUser = async (
  id: string,
  updates: Partial<User>
): Promise<User> => {
  const res = await api.put(`/users/${id}`, updates);
  return res.data;
};

export const deleteUser = async (id: string): Promise<void> => {
  await api.delete(`/users/${id}`);
};

export const registerUser = async (
  email: string,
  password: string
): Promise<User> => {
  const res = await api.post("/register", {
    email,
    password,
  });
  return res.data;
};

//
// ─── COMIDAS ─────────────────────────────────────────────────────────────────
//

export const getMeals = async () => {
  const res = await api.get("/meals");
  return res.data;
};

export const getMeal = async (id: string) => {
  const res = await api.get(`/meals/${id}`);
  return res.data;
};

export const createMeal = async (meal: any) => {
  const res = await api.post("/meals", meal);
  return res.data;
};

//
// ─── METAS ──────────────────────────────────────────────────────────────────
//

export const getGoals = async () => {
  const res = await api.get("/goals");
  return res.data;
};

export const createGoal = async (goal: any) => {
  const res = await api.post("/goals", goal);
  return res.data;
};

//
// ─── RESÚMENES DIARIOS ──────────────────────────────────────────────────────
//

export const getSummaries = async () => {
  const res = await api.get("/daily_summary");
  return res.data;
};

//
// ─── CATÁLOGO DE ALIMENTOS ───────────────────────────────────────────────────
//

export const getFoods = async () => {
  const res = await api.get("/foods_catalog");
  return res.data;
};

//
// ─── HISTORIAL DE IA ────────────────────────────────────────────────────────
//

export const getAiLogs = async () => {
  const res = await api.get("/ai_logs");
  return res.data;
};

export const createAiLog = async (log: any) => {
  const res = await api.post("/ai_logs", log);
  return res.data;
};
