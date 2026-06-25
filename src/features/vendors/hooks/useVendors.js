import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchVendors,
  fetchVendorById,
  updateVendorStatus,
} from "../api/vendorsApi";

import { queryKeys } from "../../../lib/queryKeys";

export function useVendors(filters = {}) {
  return useQuery({
    queryKey: queryKeys.vendors.list(filters),
    queryFn: () => fetchVendors(filters),
  });
}

export function useVendor(id) {
  return useQuery({
    queryKey: queryKeys.vendors.detail(id),
    queryFn: () => fetchVendorById(id),
    enabled: Boolean(id),
  });
}

export function useUpdateVendorStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }) =>
      updateVendorStatus(id, status),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.vendors.all,
      });
    },
  });
}