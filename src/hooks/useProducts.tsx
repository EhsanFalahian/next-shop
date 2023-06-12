import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addProduct,
  getProducts,
  getProductsById,
  removeProducts,
  updateProduct,
} from "@/services/ProductServices";

export const useGetProducts = () =>
  useQuery({
    queryKey: ["getProducts"],
    queryFn: getProducts,
    retry: false,
    refetchOnWindowFocus: true,
  });

export const useAddProducts = () => {
  return useMutation({ mutationFn: addProduct });
};

export const useGetProductsById = (id: string) =>
  useQuery({
    queryKey: ["getProductsById", id],
    queryFn: () => getProductsById(id),
    retry: false,
    refetchOnWindowFocus: true,
  });
export const useUpdateProducts = () => {
  return useMutation({ mutationFn: updateProduct });
};

export const useRemoveProducts = () => {
  return useMutation({ mutationFn: removeProducts });
};
