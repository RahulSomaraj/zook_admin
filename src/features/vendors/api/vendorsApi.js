import { api } from "../../../lib/axios";
import { env } from "../../../config/env";

export async function fetchVendors(filters = {}) {
  const { data } = await api.get("/admin/vendors", {
    params: filters,
  });

  return data.data;
}

export async function fetchVendorById(id) {
  const { data } = await api.get(`/admin/vendors/${id}`);
  return data;
}

export async function updateVendorStatus(id, status) {
  const { data } = await api.patch(`/admin/vendors/${id}`, {
    status,
  });

  return data;
}

export async function fetchVendorKycList() {
  const { data } = await api.get("/admin/vendor-kyc");
  return data.data;
}

export async function approveVendorKyc(id) {
  const { data } = await api.post(
    `/admin/vendor-kyc/${id}/approve`
  );

  return data;
}

export async function rejectVendorKyc(id, reason) {
  const { data } = await api.post(
    `/admin/vendor-kyc/${id}/reject`,
    { reason }
  );

  return data;
}

export async function activateVendor(id) {
  const { data } = await api.post(
    `/admin/vendors/${id}/activate`
  );

  return data;
}

export async function fetchVendorProducts(vendorId) {
  const { data } = await api.get(
    `/admin/vendors/${vendorId}/products`
  );

  return data;
}