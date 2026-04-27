/**
 * AuthProvider.jsx
 * ----------------
 * Global auth state:
 * - token stored in localStorage
 * - user profile stored in React state
 *
 * RBAC:
 * - user.role is used to enable/disable UI actions.
 */

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { apiFetch } from "../api/http";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    async function loadMe() {
      try {
        if (!token) {
          setUser(null);
          return;
        }
        const data = await apiFetch("/api/auth/me");
        setUser(data.user);
      } catch (err) {
        console.error("Auth load failed, logging out:", err);
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    loadMe();
  }, [token]);

  async function login(email, password) {
    const data = await apiFetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    localStorage.setItem("token", data.token);
    setUser(data.user);
  }

  async function register({ name, email, password }) {
    const data = await apiFetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });
    localStorage.setItem("token", data.token);
    setUser(data.user);
  }

  function logout() {
    localStorage.removeItem("token");
    setUser(null);
  }

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: Boolean(user),
      role: user?.role || "",
      canWrite: user?.role === "admin" || user?.role === "user",
      login,
      register,
      logout,
    }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}

