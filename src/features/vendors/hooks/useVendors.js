import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchVendors,
  fetchVendorById,
  updateVendorStatus,
  fetchVendorKycList,
  approveVendorKyc,
  rejectVendorKyc,
  activateVendor,
  fetchVendorProducts,
  updateVendor,
  deleteVendor,
  approveVendorProduct,
  rejectVendorProduct,
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

export function useVendorProducts(vendorId) {
  return useQuery({
    queryKey: [...queryKeys.vendors.detail(vendorId), "products"],
    queryFn: () => fetchVendorProducts(vendorId),
    enabled: Boolean(vendorId),
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

export function useVendorKycList() {
  return useQuery({
    queryKey: ["vendor-kyc"],
    queryFn: fetchVendorKycList,
  });
}

export function useApproveVendorKyc() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: approveVendorKyc,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["vendor-kyc"],
      });
    },
  });
}

export function useActivateVendor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: activateVendor,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["vendor-kyc"],
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.vendors.all,
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
        queryKey: ["vendor-kyc"],
      });
    },
  });
}

export function useUpdateVendor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }) =>
      updateVendor(id, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.vendors.all,
      });
    },
  });
}

export function useDeleteVendor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteVendor,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.vendors.all,
      });
    },
  });
}

export function useApproveVendorProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: approveVendorProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({
      predicate: (query) => query.queryKey.includes("products"),
      });
    },
  });
}

export function useRejectVendorProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ productId, reason }) =>
      rejectVendorProduct(productId, reason),

    onSuccess: () => {
      queryClient.invalidateQueries({
      predicate: (query) => query.queryKey.includes("products"),
      });
    },
  });
}