import { api } from "../../../lib/axios";

export const fetchPolicy = async (type) => {
  const { data } = await api.get(`/policies/${type}`);
  return data;
};