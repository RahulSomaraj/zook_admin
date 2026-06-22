import { useEffect } from "react";
import { refreshSession } from "../api/authApi";
import { useAuthStore } from "../store/authStore";

/**
 * Runs once at app startup. Because the access token is memory-only, a page
 * reload leaves us logged-out in JS — but the httpOnly refresh cookie is still
 * there. This attempts a silent refresh to restore the session, flipping
 * status from "loading" to "authenticated" or "unauthenticated".
 *
 * ProtectedRoute shows a splash while status is "loading" so we never flash
 * the login screen for an already-authenticated user.
 */
export function useAuthInit() {
  const setAuth = useAuthStore((s) => s.setAuth);
  const setStatus = useAuthStore((s) => s.setStatus);
  const clearAuth = useAuthStore((s) => s.clearAuth);

  useEffect(() => {
    let active = true;
    setStatus("loading");

    refreshSession()
      .then((data) => {
        if (!active) return;
        if (data?.accessToken) setAuth(data);
        else clearAuth();
      })
      .catch(() => {
        if (active) clearAuth();
      });

    return () => {
      active = false;
    };
  }, [setAuth, setStatus, clearAuth]);
}
