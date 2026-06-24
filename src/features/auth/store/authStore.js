import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  status: "idle",

  setAuth: ({ user, accessToken, refreshToken }) =>
    set({ user, accessToken, refreshToken, status: "authenticated" }),

  setToken: (accessToken) => set({ accessToken }),

  setStatus: (status) => set({ status }),

  clearAuth: () =>
    set({ user: null, accessToken: null, refreshToken: null, status: "unauthenticated" }),
}));

export const authStore = {
  getToken: () => useAuthStore.getState().accessToken,
  getRefreshToken: () => useAuthStore.getState().refreshToken,
  setToken: (token) => useAuthStore.getState().setToken(token),
  clear: () => useAuthStore.getState().clearAuth(),
};