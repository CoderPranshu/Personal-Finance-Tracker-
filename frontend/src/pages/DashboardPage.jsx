/**
 * DashboardPage.jsx
 * -----------------
 * Analytics dashboard (cards + charts).
 *
 * Performance:
 * - Uses useMemo to avoid recalculations
 */

import { useEffect, useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { apiFetch } from "../api/http";

const CHART_COLORS = ["#6366f1", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#06b6d4"];

export default function DashboardPage() {
  const [summary, setSummary] = useState(null);
  const [source, setSource] = useState("db");
  const [categoryBreakdown, setCategoryBreakdown] = useState([]);
  const [monthlyTrend, setMonthlyTrend] = useState([]);
  const [incomeVsExpense, setIncomeVsExpense] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      setError("");
      try {
        const [s, cb, mt, ive] = await Promise.all([
          apiFetch("/api/analytics/summary"),
          apiFetch("/api/analytics/category-breakdown"),
          apiFetch("/api/analytics/monthly-trend"),
          apiFetch("/api/analytics/income-vs-expense"),
        ]);
        setSummary(s);
        setSource(s.source || "db");
        setCategoryBreakdown(cb.slices || []);
        setMonthlyTrend(mt.points || []);
        setIncomeVsExpense(ive.bars || []);
      } catch (err) {
        setError(err.message);
      }
    }
    load();
  }, []);

  const cards = useMemo(() => {
    if (!summary) return [];
    return [
      { label: "Total Income", value: summary.totalIncome },
      { label: "Total Expenses", value: summary.totalExpenses },
      { label: "Balance", value: summary.balance },
    ];
  }, [summary]);

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-sm text-slate-600 mt-1">Your financial analytics.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Cache Status:</span>
          <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
            source === "cache" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
          }`}>
            {source === "cache" ? "⚡ Cached (Redis)" : "💾 Live (DB)"}
          </span>
        </div>
      </div>

      {error ? (
        <div className="rounded-md bg-red-50 text-red-700 text-sm p-3 border border-red-200">
          {error}
        </div>
      ) : null}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cards.map((c) => (
          <div key={c.label} className="rounded-xl border bg-white p-4 shadow-sm">
            <div className="text-sm text-slate-600">{c.label}</div>
            <div className="text-2xl font-semibold mt-1">₹{Number(c.value || 0).toFixed(2)}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="font-semibold text-slate-800">Expense by Category</div>
          <div className="h-72 mt-3 flex items-center justify-center">
            {categoryBreakdown.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryBreakdown}
                    dataKey="value"
                    nameKey="category"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={({ category, percent }) => `${category} (${(percent * 100).toFixed(0)}%)`}
                  >
                    {categoryBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-center">
                <div className="text-slate-400 text-3xl">📊</div>
                <div className="text-slate-500 text-sm mt-2">No expense data found.</div>
              </div>
            )}
          </div>
        </div>

        <div className="rounded-xl border bg-white p-4 shadow-sm">
          <div className="font-semibold">Income vs Expense</div>
          <div className="h-72 mt-3">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={incomeVsExpense}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#0f172a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="rounded-xl border bg-white p-4 shadow-sm">
        <div className="font-semibold">Monthly trend</div>
        <div className="h-80 mt-3">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="income" stroke="#16a34a" />
              <Line type="monotone" dataKey="expense" stroke="#dc2626" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

