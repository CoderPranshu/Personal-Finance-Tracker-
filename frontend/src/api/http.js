/**
 * http.js
 * -------
 * Tiny fetch wrapper that:
 * - Adds Authorization header when token exists
 * - Sends/receives JSON
 * - Throws readable errors for the UI
 */

const API_BASE = ""; // Use Vite proxy (see vite.config.js).

function getToken() {
  return localStorage.getItem("token") || "";
}

export async function apiFetch(path, options = {}) {
  const token = getToken();

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });

  console.log(`[API] ${res.status} ${path}`);

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const message = data?.message || "Request failed";
    const error = new Error(message);
    error.status = res.status;
    error.details = data;
    throw error;
  }

  return data;
}

