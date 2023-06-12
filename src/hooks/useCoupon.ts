import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addCoupons,
  getCoupons,
  getOneCoupon,
  removeCoupon,
  updateCoupons,
} from "@/services/CouponServices";

export const useGetCoupons = () =>
  useQuery({
    queryKey: ["getCoupons"],
    queryFn: getCoupons,
    retry: false,
    refetchOnWindowFocus: true,
  });
export const useGetOneCoupon = (id: string) =>
  useQuery({
    queryKey: ["getOneCoupon", id],
    queryFn: () => getOneCoupon(id),
    retry: false,
    refetchOnWindowFocus: true,
  });

export const useAddCoupons = () => useMutation({ mutationFn: addCoupons });

export const useUpdateCoupons = () =>
  useMutation({ mutationFn: updateCoupons });

export const useRemoveCoupon = () => useMutation({ mutationFn: removeCoupon });
