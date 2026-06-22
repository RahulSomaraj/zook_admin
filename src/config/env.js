/**
 * Centralized, typed access to environment variables.
 * Never read import.meta.env directly elsewhere — go through this file
 * so every env var has one documented source of truth.
 */
export const env = {
  // Base URL of the backend API. Set in .env (see .env.example).
  apiUrl: import.meta.env.VITE_API_URL ?? "/api",

  // When true, auth + data calls resolve from local mock data instead of
  // hitting a real backend. Handy for UI development before the API exists.
  useMock: import.meta.env.VITE_USE_MOCK === "true",

  isDev: import.meta.env.DEV,
};
