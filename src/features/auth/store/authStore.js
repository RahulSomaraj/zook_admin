import { create } from "zustand";

/**
 * Auth client-state, held by Zustand.
 *
 * The access token lives ONLY in memory (never localStorage) — this is the
 * core of the "JWT in memory + refresh cookie" model. On a full page reload
 * the token is gone, and `useAuthInit` silently restores the session by
 * calling /auth/refresh (the httpOnly refresh cookie survives the reload).
 *
 * status drives routing:
 *   idle         → app just mounted, haven't checked yet
 *   loading      → silent refresh in flight (show splash)
 *   authenticated→ user is logged in
 *   unauthenticated → show login
 */
export const useAuthStore = create((set) => ({
  user: null,
  accessToken: null,
  status: "idle",

  setAuth: ({ user, accessToken }) =>
    set({ user, accessToken, status: "authenticated" }),

  setToken: (accessToken) => set({ accessToken }),

  setStatus: (status) => set({ status }),

  clearAuth: () =>
    set({ user: null, accessToken: null, status: "unauthenticated" }),
}));

/**
 * Non-React accessor for use OUTSIDE components (e.g. the axios interceptor),
 * where hooks aren't allowed. Reads/writes the same store.
 */
export const authStore = {
  getToken: () => useAuthStore.getState().accessToken,
  setToken: (token) => useAuthStore.getState().setToken(token),
  clear: () => useAuthStore.getState().clearAuth(),
};
