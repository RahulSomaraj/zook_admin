import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../../features/auth/store/authStore";
import { ROUTES } from "./routes";

/**
 * Gate for authenticated routes.
 * - While the startup silent-refresh is running (status idle/loading) we show
 *   a splash so we never flash the login page to a logged-in user.
 * - If unauthenticated, redirect to /login and remember where they were going
 *   (location) so we can send them back after login.
 */
export default function ProtectedRoute({ children }) {
  const status = useAuthStore((s) => s.status);
  const location = useLocation();

  if (status === "idle" || status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0d0e12]">
        <div className="h-8 w-8 rounded-full border-2 border-orange-600 border-t-transparent animate-spin" />
      </div>
    );
  }

  if (status !== "authenticated") {
    return <Navigate to={ROUTES.login} replace state={{ from: location }} />;
  }

  return children;
}
