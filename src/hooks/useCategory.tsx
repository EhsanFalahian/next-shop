import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getProducts,
  removeProducts,
  updateProduct,
} from "@/services/ProductServices";
import {
  addCategory,
  getCategories,
  getCategoryById,
  removeCategory,
  updateCategory,
} from "@/services/CategoryServices";

export const useGetCategories = () =>
  useQuery({
    queryKey: ["getCategories"],
    queryFn: getCategories,
    retry: false,
    refetchOnWindowFocus: true,
  });

export const useGetCategoryById = (id: string) =>
  useQuery({
    queryKey: ["getCategoryById", id],
    queryFn: () => getCategoryById(id),
    retry: false,
    refetchOnWindowFocus: true,
  });

export const useAddCategory = () => useMutation({ mutationFn: addCategory });

export const useUpdateCategory = () => {
  return useMutation({ mutationFn: updateCategory });
};

export const useRemoveCategory = () => {
  return useMutation({ mutationFn: removeCategory });
};
