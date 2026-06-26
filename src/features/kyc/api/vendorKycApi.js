import { api } from "../../../lib/axios";

export async function fetchVendorKyc() {
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