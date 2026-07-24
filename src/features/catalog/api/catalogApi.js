import { api } from "../../../lib/axios";


export const getCatalogProducts = async (params = {}) => {
  const { data } = await api.get("/admin/catalog", {
    params,
  });

  return data;
};

export const createCatalogProduct = async (payload) => {
  try {
    const { data } = await api.post("/admin/catalog", payload);
    return data;
  } catch (error) {
    console.log("Backend Error:", error.response?.data);

    // 👇 add this line
    console.log("Validation Messages:", error.response?.data?.message);

    throw error;
  }
};

export const getCatalogProduct = async (id) => {
  const { data } = await api.get(`/admin/catalog/${id}`);
  return data;
};

export const updateCatalogProduct = async ({ id, payload }) => {
  const { data } = await api.patch(`/admin/catalog/${id}`, payload);
  return data;
};

export const deleteCatalogProduct = async (id) => {
  const { data } = await api.delete(`/admin/catalog/${id}`);
  return data;
};

export const restoreCatalogProduct = async (id) => {
  const { data } = await api.post(`/admin/catalog/${id}/restore`);
  return data;
};


// Categories
export const getCategories = async (params = {}) => {
  const { data } = await api.get("/admin/categories", {
    params,
  });

  return data;
};

// Brands
export const getBrands = async (params = {}) => {
  const { data } = await api.get("/admin/brands", {
    params,
  });

  return data;
};

// Categories
export const createCategory = async (payload) => {
  const { data } = await api.post("/admin/categories", payload);
  return data;
};

export const updateCategory = async ({ id, payload }) => {
  const { data } = await api.patch(`/admin/categories/${id}`, payload);
  return data;
};

export const deleteCategory = async (id) => {
  const { data } = await api.delete(`/admin/categories/${id}`);
  return data;
};

export const restoreCategory = async (id) => {
  const { data } = await api.post(`/admin/categories/${id}/restore`);
  return data;
};

// Brands
export const createBrand = async (payload) => {
  const { data } = await api.post("/admin/brands", payload);
  return data;
};

export const updateBrand = async ({ id, payload }) => {
  const { data } = await api.patch(`/admin/brands/${id}`, payload);
  return data;
};

export const deleteBrand = async (id) => {
  const { data } = await api.delete(`/admin/brands/${id}`);
  return data;
};

export const restoreBrand = async (id) => {
  const { data } = await api.post(`/admin/brands/${id}/restore`);
  return data;
};

export async function fetchProductById(id) {
  const { data } = await api.get(`/admin/products/${id}`);
  return data;
}