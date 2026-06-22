/**
 * Central registry of React Query cache keys.
 *
 * Keeping every key here (instead of inline strings scattered across hooks)
 * means cache invalidation is reliable and refactors are safe:
 *   queryClient.invalidateQueries({ queryKey: queryKeys.orders.all })
 *
 * Convention: each feature exposes `all`, a `list(filters)` and a `detail(id)`.
 */
export const queryKeys = {
  orders: {
    all: ["orders"],
    list: (filters = {}) => ["orders", "list", filters],
    detail: (id) => ["orders", "detail", id],
  },
  products: {
    all: ["products"],
    list: (filters = {}) => ["products", "list", filters],
    detail: (id) => ["products", "detail", id],
  },
  kyc: {
    all: ["kyc"],
    list: (filters = {}) => ["kyc", "list", filters],
    detail: (id) => ["kyc", "detail", id],
  },
  // Add new features here as you migrate them.
};
