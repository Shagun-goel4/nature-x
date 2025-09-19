export const API_BASE = import.meta.env.VITE_API_URL || "/api";

export async function apiFetch(path, options = {}) {
  const url = path.startsWith("http") ? path : `${API_BASE}${path}`;
  const resp = await fetch(url, options);
  return resp;
}


