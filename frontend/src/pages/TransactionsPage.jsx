/**
 * TransactionsPage.jsx
 * --------------------
 * Transaction list + filters + pagination.
 *
 * Performance:
 * - Virtual list with react-window so large lists stay fast.
 * - useCallback for handlers to avoid re-renders.
 */

import { useCallback, useEffect, useMemo, useState } from "react";
import { List } from "react-window";
import { apiFetch } from "../api/http";
import { useAuth } from "../auth/AuthProvider";
import TransactionModal from "../components/TransactionModal";

function TransactionRow({ data, index, style }) {
  const tx = data.items[index];
  const { onDelete, onEdit, canWrite } = data;

  return (
    <div style={style} className="px-3 py-2 border-b flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors group">
      <div className="flex items-center gap-3 min-w-0">
        <div className="min-w-0">
          <div className="font-medium truncate">{tx.title}</div>
          <div className="text-xs text-slate-500">
            {tx.date} • {tx.category} • {tx.type}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className={tx.type === "income" ? "text-green-700 font-semibold" : "text-red-700 font-semibold"}>
          {tx.type === "income" ? "+" : "-"} ₹{Number(tx.amount).toFixed(2)}
        </div>
        {canWrite && (
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => onEdit(tx)}
              className="text-slate-400 hover:text-indigo-600 p-1"
              title="Edit"
            >
              ✏️
            </button>
            <button
              onClick={() => onDelete(tx.id)}
              className="text-slate-400 hover:text-red-600 p-1"
              title="Delete"
            >
              🗑️
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function TransactionsPage() {
  const { canWrite, role } = useAuth();
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);

  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const totalPages = useMemo(() => Math.max(1, Math.ceil(total / limit)), [total, limit]);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const qs = new URLSearchParams({
        page: String(page),
        limit: String(limit),
        ...(type ? { type } : {}),
        ...(category ? { category } : {}),
        ...(startDate ? { startDate } : {}),
        ...(endDate ? { endDate } : {}),
      });

      const data = await apiFetch(`/api/transactions?${qs.toString()}`);
      setItems(data.transactions || []);
      setTotal(data.total || 0);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [page, limit, type, category, startDate, endDate]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await apiFetch("/api/analytics/categories");
        setCategories(data.categories || []);
      } catch {
        // Categories are optional for UX; ignore failures.
      }
    }
    loadCategories();
  }, []);

  const resetFilters = useCallback(() => {
    setType("");
    setCategory("");
    setStartDate("");
    setEndDate("");
    setPage(1);
  }, []);

  const remove = useCallback(async (id) => {
    if (!confirm("Delete this transaction?")) return;
    try {
      await apiFetch(`/api/transactions/${id}`, { method: "DELETE" });
      load();
    } catch (err) {
      alert(err.message);
    }
  }, [load]);

  const edit = useCallback((tx) => {
    setEditingTransaction(tx);
    setIsModalOpen(true);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Transactions</h1>
          <p className="text-sm text-slate-600 mt-1">
            Role: <span className="font-medium">{role}</span> • {canWrite ? "You can add/edit/delete." : "Read-only (view only)."}
          </p>
        </div>
      </div>

      <div className="rounded-xl border bg-white p-4 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          <div>
            <label className="text-xs font-medium text-slate-600">Type</label>
            <select className="mt-1 w-full rounded-md border px-3 py-2 text-sm" value={type} onChange={(e) => setType(e.target.value)}>
              <option value="">All</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-medium text-slate-600">Category</label>
            <select
              className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-medium text-slate-600">Start date</label>
            <input className="mt-1 w-full rounded-md border px-3 py-2 text-sm" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          </div>

          <div>
            <label className="text-xs font-medium text-slate-600">End date</label>
            <input className="mt-1 w-full rounded-md border px-3 py-2 text-sm" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </div>

          <div className="flex items-end gap-2">
            <button
              type="button"
              onClick={() => {
                setPage(1);
                load();
              }}
              className="flex-1 rounded-md bg-slate-900 text-white px-3 py-2 text-sm hover:bg-slate-800"
            >
              Apply
            </button>
            <button type="button" onClick={resetFilters} className="rounded-md border px-3 py-2 text-sm hover:bg-slate-50">
              Reset
            </button>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="text-sm text-slate-600">
            Showing page <span className="font-medium">{page}</span> of <span className="font-medium">{totalPages}</span> (total {total})
          </div>

          <div className="flex items-center gap-2">
            <select className="rounded-md border px-2 py-1 text-sm" value={limit} onChange={(e) => setLimit(Number(e.target.value))}>
              {[10, 20, 50].map((n) => (
                <option key={n} value={n}>
                  {n}/page
                </option>
              ))}
            </select>
            <button
              type="button"
              className="rounded-md border px-3 py-1.5 text-sm hover:bg-slate-50 disabled:opacity-50"
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              Prev
            </button>
            <button
              type="button"
              className="rounded-md border px-3 py-1.5 text-sm hover:bg-slate-50 disabled:opacity-50"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {error ? (
        <div className="rounded-md bg-red-50 text-red-700 text-sm p-3 border border-red-200">{error}</div>
      ) : null}

      <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
        <div className="px-3 py-2 border-b text-sm font-medium flex items-center justify-between">
          <div>List</div>
          <div className="text-xs text-slate-500">{loading ? "Loading…" : "Ready"}</div>
        </div>

        <div style={{ height: 520 }}>
          {items.length > 0 ? (
            <List
              height={520}
              itemCount={items.length}
              itemSize={64}
              width="100%"
              itemData={{ items, onDelete: remove, onEdit: edit, canWrite }}
            >
              {TransactionRow}
            </List>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-500 bg-slate-50/50 dark:bg-slate-900/50">
              <div className="text-4xl mb-2">💸</div>
              <p className="font-medium text-slate-900 dark:text-white">No transactions found</p>
              <p className="text-xs">Try adjusting your filters or add a new one.</p>
            </div>
          )}
        </div>
      </div>

      <div className="rounded-xl border bg-white p-4 shadow-sm">
        <div className="font-semibold">Write actions</div>
        <p className="text-sm text-slate-600 mt-1">
          Role: <span className="font-medium">{role}</span> • {canWrite ? "You can add/edit/delete." : "Read-only."}
        </p>
        <div className="mt-3 flex gap-2">
          <button
            type="button"
            disabled={!canWrite}
            onClick={() => setIsModalOpen(true)}
            className="rounded-md bg-slate-900 text-white px-3 py-2 text-sm hover:bg-slate-800 disabled:opacity-50"
          >
            Add Transaction
          </button>
          <button type="button" disabled={!canWrite} className="rounded-md border px-3 py-2 text-sm hover:bg-slate-50 disabled:opacity-50">
            Edit (Demo)
          </button>
          <button type="button" disabled={!canWrite} className="rounded-md border px-3 py-2 text-sm hover:bg-slate-50 disabled:opacity-50">
            Delete (Demo)
          </button>
        </div>
      </div>

      {isModalOpen && (
        <TransactionModal
          initialData={editingTransaction}
          onClose={() => {
            setIsModalOpen(false);
            setEditingTransaction(null);
          }}
          onSuccess={() => {
            load();
            apiFetch("/api/analytics/categories").then((data) => setCategories(data.categories || []));
          }}
        />
      )}
    </div>
  );
}

