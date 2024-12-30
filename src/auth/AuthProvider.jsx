import React, { createContext, useState } from "react";
import apiClient from "../api/apiClient";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(sessionStorage.getItem("token"));

  const register = async (credentials) => {
    await apiClient.post("/register", credentials);
    await login(credentials);
  };

  const login = async (credentials) => {
    const response = await apiClient.post("/login", credentials);
    setToken(response.data.token);
    sessionStorage.setItem("token", response.data.token);
  };

  const logout = () => {
    setToken(null);
    sessionStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ token, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
