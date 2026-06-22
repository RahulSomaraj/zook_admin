import { useQueryClient } from "@tanstack/react-query";
import { logoutRequest } from "../api/authApi";
import { useAuthStore } from "../store/authStore";

/**
 * Logout: clears the refresh cookie server-side, wipes the in-memory token,
 * and drops all cached server data so the next user starts clean.
 */
export function useLogout() {
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const queryClient = useQueryClient();

  return async function logout() {
    try {
      await logoutRequest();
    } finally {
      clearAuth();
      queryClient.clear();
    }
  };
}
