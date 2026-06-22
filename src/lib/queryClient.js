import { QueryClient } from "@tanstack/react-query";

/**
 * Single QueryClient for the whole app.
 * Defaults are tuned for an admin dashboard: data is considered fresh for
 * 30s (avoids refetch storms while navigating), retries once on failure,
 * and does not refetch just because the window regained focus.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      gcTime: 5 * 60_000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0,
    },
  },
});
