import { api } from "../../../lib/axios";

export const createCategorySpecification = async (payload) => {
  const { data } = await api.post(
    "/admin/category-specifications",
    payload
  );

  return data;
};