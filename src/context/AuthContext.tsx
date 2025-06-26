import React, { createContext, useContext, useEffect, useState } from "react";

export type User = {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  created_at?: string;
  avatarUrl?: string; 
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Aquí deberías llamar a tu backend real
    // const res = await axios.post("/login", { email, password });
    // setUser(res.data.user);

    const fakeUser: User = {
      _id: "fake-id",
      name: "Demo User",
      email,
      role: "user",
    };
    setUser(fakeUser);
    localStorage.setItem("user", JSON.stringify(fakeUser));
  };

  const register = async (name: string, email: string, password: string) => {
    // const res = await axios.post("/register", { name, email, password });
    // setUser(res.data.user);

    const newUser: User = {
      _id: "new-id",
      name,
      email,
      role: "user",
    };
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
