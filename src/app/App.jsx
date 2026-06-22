import { useAuthInit } from "../features/auth";
import AppRouter from "./router/AppRouter";

/**
 * App shell: kicks off the silent session refresh on mount, then renders the
 * router. Providers live one level up in main.jsx via AppProviders.
 */
export default function App() {
  useAuthInit();
  return <AppRouter />;
}
