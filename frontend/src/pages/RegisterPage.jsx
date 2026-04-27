/**
 * RegisterPage.jsx
 * ----------------
 * Register screen.
 */

import { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setError("");
      setSubmitting(true);
      try {
        await register({ name, email, password });
        navigate("/dashboard", { replace: true });
      } catch (err) {
        setError(err.message);
      } finally {
        setSubmitting(false);
      }
    },
    [name, email, password, register, navigate]
  );

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)] p-6">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-xl shadow-slate-200/50 dark:shadow-none transition-colors">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Create Account</h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">Start tracking your finances in minutes.</p>
        </div>

        {error ? (
          <div className="mb-6 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 text-sm p-4 border border-red-200 dark:border-red-900/30 flex items-center gap-3">
            <span>⚠️</span> {error}
          </div>
        ) : null}

        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Full Name</label>
            <input
              className="mt-1.5 w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all dark:text-white"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              autoComplete="name"
              required
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Email Address</label>
            <input
              className="mt-1.5 w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all dark:text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              required
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Password</label>
            <input
              type="password"
              className="mt-1.5 w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all dark:text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min. 6 characters"
              autoComplete="new-password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-xl bg-indigo-600 text-white px-4 py-3.5 text-sm font-bold hover:bg-indigo-500 disabled:opacity-60 transition-all shadow-lg shadow-indigo-200 dark:shadow-none transform active:scale-[0.98]"
          >
            {submitting ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <div className="text-center text-sm text-slate-600 dark:text-slate-400 mt-8">
          Already have an account?{" "}
          <Link className="text-indigo-600 font-bold hover:underline" to="/login">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}

