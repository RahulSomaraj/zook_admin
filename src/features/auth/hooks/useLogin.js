import { useMutation } from "@tanstack/react-query";
import { loginRequest } from "../api/authApi";
import { useAuthStore } from "../store/authStore";

/**
 * Login mutation. Components get { mutate, isPending, error } and the store
 * is updated automatically on success.
 *
 * Usage:
 *   const login = useLogin();
 *   login.mutate({ email, password }, { onSuccess: () => navigate("/") });
 */
export function useLogin() {
  const setAuth = useAuthStore((s) => s.setAuth);

  return useMutation({
    mutationFn: loginRequest,
    onSuccess: (data) => setAuth(data),
  });
}
