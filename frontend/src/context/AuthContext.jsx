import React, { createContext, useState, useEffect } from "react";
import { apiFetch } from "../lib/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      apiFetch("/user/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data._id) setUser(data);
          else setUser(null);
        })
        .catch(() => setUser(null));
    } else {
      setUser(null);
    }
  }, [token]);

  const login = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
  };
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
