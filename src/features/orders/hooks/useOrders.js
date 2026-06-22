import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchOrders, fetchOrderById, updateOrderStatus } from "../api/ordersApi";
import { queryKeys } from "../../../lib/queryKeys";

/**
 * Server-state hooks for orders. React Query gives us caching, dedup,
 * background refetch, and { data, isLoading, isError } for free — no manual
 * useState/useEffect fetching, no global store for server data.
 *
 * In a page:
 *   const { data: orders = [], isLoading, isError } = useOrders({ status });
 */
export function useOrders(filters = {}) {
  return useQuery({
    queryKey: queryKeys.orders.list(filters),
    queryFn: () => fetchOrders(filters),
  });
}

export function useOrder(id) {
  return useQuery({
    queryKey: queryKeys.orders.detail(id),
    queryFn: () => fetchOrderById(id),
    enabled: Boolean(id), // don't fire until an id is selected
  });
}

/**
 * Mutation example: after a successful status change, invalidate the orders
 * cache so every list/detail refetches with fresh data.
 */
export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }) => updateOrderStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.all });
    },
  });
}
