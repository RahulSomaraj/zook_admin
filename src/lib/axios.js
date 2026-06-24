import axios from "axios";
import { env } from "../config/env";
import { authStore } from "../features/auth/store/authStore";

export const api = axios.create({
  baseURL: env.apiUrl,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = authStore.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let refreshPromise = null;

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    const status = error.response?.status;

    const isAuthRequest = original?.url?.includes("/auth/admin/login");

    if (status === 401 && original && !original._retry && !isAuthRequest) {
      original._retry = true;
      try {
        refreshPromise = refreshPromise ?? requestNewAccessToken();
        const { accessToken, refreshToken } = await refreshPromise;
        refreshPromise = null;

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        authStore.setToken(accessToken);
        original.headers.Authorization = `Bearer ${accessToken}`;
        return api(original);
      } catch (refreshError) {
        refreshPromise = null;
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        authStore.clear();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

async function requestNewAccessToken() {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) return Promise.reject(new Error("No refresh token")); 

  const { data } = await axios.post(
    `${env.apiUrl}/auth/refresh`,
    { refreshToken }
  );
  const payload = data.data;
  return { accessToken: payload.accessToken, refreshToken: payload.refreshToken };
}