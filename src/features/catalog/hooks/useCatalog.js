import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchProductById } from "../api/catalogApi";
import { createCategorySpecification } from "../api/categorySpecificationsApi";


import {
  getCategories,
  getBrands,
  createCategory,
  updateCategory,
  deleteCategory,
  restoreCategory,
  createBrand,
  updateBrand,
  deleteBrand,
  restoreBrand,
  getCatalogProducts,
  getCatalogProduct,
  createCatalogProduct,
  updateCatalogProduct,
  deleteCatalogProduct,
  restoreCatalogProduct,
} from "../api/catalogApi";

export const useDeleteCatalogProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCatalogProduct,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["catalog-products"],
      });
    },
  });
};

export const useRestoreCatalogProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: restoreCatalogProduct,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["catalog-products"],
      });
    },
  });
};


export const useUpdateCatalogProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCatalogProduct,

    onSuccess: () => {
  console.log("Mutation Success");

  queryClient.invalidateQueries({
    queryKey: ["catalog-products"],
  });

  queryClient.invalidateQueries({
    queryKey: ["catalog-product"],
  });

  console.log("Queries Invalidated");
},
  });
};

export const useCatalogProducts = (params = {}) => {
  return useQuery({
    queryKey: ["catalog-products", params],
    queryFn: () => getCatalogProducts(params),
  });
};

export const useCatalogProduct = (id) => {
  return useQuery({
    queryKey: ["catalog-product", id],
    queryFn: () => getCatalogProduct(id),
    enabled: !!id,
  });
};



export const useCategories = (params) => {
  return useQuery({
    queryKey: ["categories", params],
    queryFn: () => getCategories(params),
  });
};

export const useBrands = (params) => {
  return useQuery({
    queryKey: ["brands", params],
    queryFn: () => getBrands(params),
  });
};

export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCategory,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
  });
}

export function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCategory,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCategory,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
  });
}

export function useRestoreCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: restoreCategory,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
  });
}

export function useCreateBrand() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBrand,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["brands"],
      });
    },
  });
}

export function useUpdateBrand() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateBrand,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["brands"],
      });
    },
  });
}

export function useDeleteBrand() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBrand,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["brands"],
      });
    },
  });
}

export function useRestoreBrand() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: restoreBrand,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["brands"],
      });
    },
  });
}

export function useCreateCatalogProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCatalogProduct,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["catalog-products"],
      });
    },
  });
}

export function useProduct(id) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id),
    enabled: Boolean(id),
  });
}

export function useCreateCategorySpecification() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCategorySpecification,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["category-specifications"],
      });
    },
  });
}
