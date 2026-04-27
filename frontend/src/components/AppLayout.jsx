/**
 * AppLayout.jsx
 * -------------
 * Main layout:
 * - Sidebar navigation
 * - Top bar with current role + logout
 */

import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import { useTheme } from "../context/ThemeProvider";
import TransactionModal from "./TransactionModal";

function NavItem({ to, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          "block rounded-md px-3 py-2 text-sm font-medium",
          isActive ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-100",
        ].join(" ")
      }
    >
      {label}
    </NavLink>
  );
}

export function AppLayout() {
  const { user, logout, canWrite, role } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-[280px_1fr] bg-slate-50 dark:bg-slate-950 transition-colors">
      <aside className="border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors flex flex-col">
        <div className="p-6">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 text-white p-1 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">NexusFinance</span>
          </div>
          <div className="mt-4 flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
            <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 font-bold text-xs uppercase">
              {user?.name?.[0] || "U"}
            </div>
            <div className="min-w-0">
              <div className="text-sm font-bold text-slate-900 dark:text-white truncate">{user?.name}</div>
              <div className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">{user?.role}</div>
            </div>
          </div>
        </div>

        <nav className="px-3 pb-4 space-y-1">
          <NavItem to="/dashboard" label="Dashboard" />
          <NavItem to="/transactions" label="Transactions" />
          {role === "admin" && <NavItem to="/users" label="Users" />}
        </nav>

        {canWrite && (
          <div className="px-3 pb-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors"
            >
              <span>+</span> New Transaction
            </button>
          </div>
        )}

        <div className="mt-auto p-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
          <button
            type="button"
            onClick={toggleTheme}
            className="w-full flex items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-slate-800 px-3 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
          >
            {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
          </button>
          <button
            type="button"
            onClick={logout}
            className="w-full rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-3 py-2.5 text-sm font-bold hover:bg-slate-800 dark:hover:bg-slate-100 transition-all"
          >
            Logout
          </button>
        </div>
      </aside>

      <main className="p-4 md:p-8 bg-slate-50">
        <Outlet />
      </main>

      {isModalOpen && (
        <TransactionModal
          onClose={() => setIsModalOpen(false)}
          onSuccess={() => {
            // Success! The children pages can refresh their own data.
            // For simplicity, we can reload the page or use a custom event.
            window.location.reload(); 
          }}
        />
      )}
    </div>
  );
}

