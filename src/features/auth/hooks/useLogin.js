import { useMutation } from "@tanstack/react-query";
import { loginRequest } from "../api/authApi";
import { useAuthStore } from "../store/authStore";

export function useLogin() {
  const setAuth = useAuthStore((s) => s.setAuth);

  return useMutation({
    mutationFn: loginRequest,
    onSuccess: (data) => setAuth(data),
    onError: (error) => {
      // Normalise the error message so LoginPage can display it cleanly.
      // Axios wraps the backend response in error.response.data
      const msg =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Login failed. Please try again.";
      // Attach a clean message the component can read via login.error.message
      error.message = msg;
    },
  });
}