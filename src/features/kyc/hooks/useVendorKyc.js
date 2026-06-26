import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  fetchVendorKyc,
  approveVendorKyc,
  rejectVendorKyc,
} from "../api/vendorKycApi";

import { queryKeys } from "../../../lib/queryKeys";

export function useVendorKyc() {
  return useQuery({
    queryKey: queryKeys.kyc.all,
    queryFn: fetchVendorKyc,
  });
}

export function useApproveVendorKyc() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: approveVendorKyc,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.kyc.all,
      });
    },
  });
}

export function useRejectVendorKyc() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, reason }) =>
      rejectVendorKyc(id, reason),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.kyc.all,
      });
    },
  });
}