import { useMutation } from "@tanstack/react-query";
import { addToCart, decrementProduct } from "@/services/CartServices";

export const UseAddToCart = () => {
  return useMutation({ mutationFn: addToCart });
};

export const UseDecrementFromCart = () => {
  return useMutation({ mutationFn: decrementProduct });
};
