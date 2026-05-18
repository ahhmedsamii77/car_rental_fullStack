import axios from "axios";
import { queryClient } from "./queryClient";

const baseURL = import.meta.env.VITE_BASE_URL as string;

// ─── Helpers ──────────────────────────────────────────────────────────────────

import { jwtDecode } from "jwt-decode";

export function getPrefix(token?: string): string {
  if (!token) return "Bearer";
  try {
    const { role } = jwtDecode<{ role: string }>(token);
    return role === "admin" ? "Admin" : "Bearer";
  } catch {
    return "Bearer";
  }
}

// ─── Axios instance ───────────────────────────────────────────────────────────

export const api = axios.create({ baseURL });

// Attach token on every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.authorization = `${getPrefix(token)} ${token}`;
  }
  return config;
});

// Silent token-refresh on 401
let refreshPromise: Promise<string> | null = null;

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status !== 401 ||
      originalRequest._retry ||
      originalRequest.url?.includes("/refershToken")
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      if (!refreshPromise) {
        const refreshToken = localStorage.getItem("refersh_token");
        const prefix = getPrefix(refreshToken ?? undefined);
        refreshPromise = axios
          .post(
            `${baseURL}/users/refershToken`,
            {},
            { headers: { authorization: refreshToken ? `${prefix} ${refreshToken}` : "" } },
          )
          .then((res) => {
            const newAccess  = res.data.access_token  as string;
            const newRefresh = res.data.refersh_token as string;
            localStorage.setItem("access_token",  newAccess);
            localStorage.setItem("refersh_token", newRefresh);
            return newAccess;
          });
      }

      const newToken = await refreshPromise;
      refreshPromise = null;

      originalRequest.headers = originalRequest.headers ?? {};
      originalRequest.headers.authorization = `${getPrefix(newToken)} ${newToken}`;
      return api(originalRequest);
    } catch (err) {
      refreshPromise = null;
      localStorage.removeItem("access_token");
      localStorage.removeItem("refersh_token");
      localStorage.removeItem("role");
      queryClient.clear();
      window.location.href = "/";
      return Promise.reject(err);
    }
  },
);
