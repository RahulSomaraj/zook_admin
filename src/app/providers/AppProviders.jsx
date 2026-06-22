import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { queryClient } from "../../lib/queryClient";

/**
 * Composes all top-level providers in one place.
 * Add future providers (theme, i18n, error boundary) here so main.jsx
 * stays a one-liner.
 */
export default function AppProviders({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>{children}</BrowserRouter>
    </QueryClientProvider>
  );
}
