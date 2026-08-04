import { api } from "../../../lib/axios";

export const createCategorySpecification = async (payload) => {
  const { data } = await api.post(
    "/admin/category-specifications",
    payload
  );

  return data;
};

export const getCategorySpecifications = async (categoryId) => {
  const { data } = await api.get("/admin/category-specifications", {
    params: {
      categoryId,
    },
  });

  return data;
};

export const updateCategorySpecification = async ({ id, payload }) => {
  const { data } = await api.patch(
    `/admin/category-specifications/${id}`,
    payload
  );

  return data;
};