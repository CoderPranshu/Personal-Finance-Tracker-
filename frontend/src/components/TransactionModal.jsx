import { useState } from "react";
import { apiFetch } from "../api/http";

export default function TransactionModal({ onClose, onSuccess, initialData }) {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    amount: initialData?.amount || "",
    type: initialData?.type || "expense",
    category: initialData?.category || "",
    date: initialData?.date ? initialData.date.split("T")[0] : new Date().toISOString().split("T")[0],
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const url = initialData ? `/api/transactions/${initialData.id}` : "/api/transactions";
      const method = initialData ? "PUT" : "POST";
      
      await apiFetch(url, {
        method,
        body: JSON.stringify({
          ...formData,
          amount: Number(formData.amount),
        }),
      });
      onSuccess();
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <h2 className="text-xl font-semibold">{initialData ? "Edit Transaction" : "Add Transaction"}</h2>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {error && (
            <div className="rounded-md bg-red-50 p-3 text-sm text-red-700 border border-red-200">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-700">Title</label>
            <input
              required
              className="mt-1 w-full rounded-md border px-3 py-2 text-sm focus:ring-2 focus:ring-slate-900 outline-none"
              placeholder="e.g. Rent, Salary"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">Amount</label>
              <input
                required
                type="number"
                step="0.01"
                min="0"
                className="mt-1 w-full rounded-md border px-3 py-2 text-sm focus:ring-2 focus:ring-slate-900 outline-none"
                placeholder="0.00"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Type</label>
              <select
                className="mt-1 w-full rounded-md border px-3 py-2 text-sm focus:ring-2 focus:ring-slate-900 outline-none"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Category</label>
            <input
              required
              className="mt-1 w-full rounded-md border px-3 py-2 text-sm focus:ring-2 focus:ring-slate-900 outline-none"
              placeholder="e.g. Housing, Food"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Date</label>
            <input
              required
              type="date"
              className="mt-1 w-full rounded-md border px-3 py-2 text-sm focus:ring-2 focus:ring-slate-900 outline-none"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            />
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Transaction"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
