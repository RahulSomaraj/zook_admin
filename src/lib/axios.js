import axios from "axios";
import { env } from "../config/env";
import { authStore } from "../features/auth/store/authStore";

/**
 * Pre-configured axios instance used by every feature's api/ module.
 *
 * - withCredentials: true  → the httpOnly refresh-token cookie is sent on
 *   refresh calls without JS ever touching it.
 * - Request interceptor    → attaches the in-memory access token.
 * - Response interceptor   → on a 401, transparently refreshes the access
 *   token once and replays the original request. Concurrent 401s share a
 *   single refresh call via `refreshPromise`.
 */
export const api = axios.create({
  baseURL: env.apiUrl,
  withCredentials: true,
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

    if (status === 401 && original && !original._retry) {
      original._retry = true;
      try {
        // Coalesce parallel refreshes into one network call.
        refreshPromise = refreshPromise ?? requestNewAccessToken();
        const newToken = await refreshPromise;
        refreshPromise = null;

        authStore.setToken(newToken);
        original.headers.Authorization = `Bearer ${newToken}`;
        return api(original);
      } catch (refreshError) {
        refreshPromise = null;
        authStore.clear(); // refresh failed → force re-login
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

/**
 * Calls the refresh endpoint with a *bare* axios (not `api`) so it can never
 * recurse back through the response interceptor. The refresh token rides
 * along as an httpOnly cookie thanks to withCredentials.
 */
async function requestNewAccessToken() {
  const { data } = await axios.post(
    `${env.apiUrl}/auth/refresh`,
    {},
    { withCredentials: true }
  );
  return data.accessToken;
}
