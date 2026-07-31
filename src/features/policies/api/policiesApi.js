import { api } from "../../../lib/axios";

export const fetchPolicies = async (params = {}) => {
  const { data } = await api.get("/admin/policies", {
    params,
  });

  return data;
};