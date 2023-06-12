"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useGetUser } from "@/hooks/useAuth";
import toast from "react-hot-toast";
import Loading from "@/common/Loading";
import { UseAddToCart } from "@/hooks/useCart";
import Link from "next/link";

const AddToCart = ({ product }) => {
  const { isLoading, mutateAsync } = UseAddToCart();
  const queryClient = useQueryClient();
  const { data } = useGetUser();
  const { user } = data || {};

  const isInCart = (user, product) => {
    if (!user) return false;
    return user.cart?.products.some((p) => p.productId === product._id);
  };
  const addToCartHandler = async () => {
    if (!user) {
      toast.error("لطفا ابتدا وارد شوید.");
    }
    try {
      const { message } = await mutateAsync(product._id);
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["getUser"] });
    } catch (error: any) {
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      }
    }
  };
  return (
    <div className="mt-6">
      {isInCart(user, product) ? (
        <Link href={"/cart"} className="text-primary-800 font-bold">
          ادامه سفارش
        </Link>
      ) : isLoading ? (
        <Loading />
      ) : (
        <button onClick={addToCartHandler} className="btn btn--primary">
          افزودن به سبد خرید
        </button>
      )}
    </div>
  );
};

export default AddToCart;
