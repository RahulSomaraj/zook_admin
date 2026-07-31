import { api } from "../../../lib/axios";

export const fetchSpecifications = async () => {
  const { data } = await api.get("/admin/specifications");
  return data;
};