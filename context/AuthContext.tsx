"use client";

import { createContext, useContext, useState } from "react";

interface User {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "user";
}

interface AuthContextType {
  user: User | null;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window === "undefined") return null;
    const storedUser = localStorage.getItem("rhemar_user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const logout = () => {
    // Remove cookies
    document.cookie = "token=; path=/; max-age=0";
    document.cookie = "userRole=; path=/; max-age=0";

    localStorage.removeItem("rhemar_user");
    setUser(null);

    window.location.href = "/auth/login";
  };

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)!;
