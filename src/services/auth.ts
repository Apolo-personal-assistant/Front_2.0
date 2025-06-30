// src/services/auth.ts
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const login = async (email: string, password: string) => {
  const res = await axios.post(`${API_URL}/auth/login`, new URLSearchParams({
    username: email,
    password: password
  }));
  localStorage.setItem('token', res.data.access_token);
  return res.data;
};

export const register = async (data: {
  email: string;
  password: string;
  full_name?: string;
}) => {
  const res = await axios.post(`${API_URL}/auth/register`, data);
  return res.data;
};

export const logout = () => {
  localStorage.removeItem('token');
};

export const getToken = () => localStorage.getItem('token');
