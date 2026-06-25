import { api } from "../../../lib/axios";
import { env } from "../../../config/env";

export async function fetchVendors(filters = {}) {
  const { data } = await api.get("/admin/vendors", {
    params: filters,
  });

  return data;
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