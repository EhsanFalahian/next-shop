import { useQuery } from "@tanstack/react-query";
import {
  getAdminPayments,
  getAllUsers,
  getProfile,
} from "@/services/AuthServices";

export const useGetUser = () =>
  useQuery({
    queryKey: ["getUser"],
    queryFn: getProfile,
    retry: false,
    // refetchOnWindowFocus: true,
  });

export const useGetUsers = () =>
  useQuery({
    queryKey: ["getUsers"],
    queryFn: getAllUsers,
    retry: false,
    refetchOnWindowFocus: true,
  });

export const useGetAdminPayment = () =>
  useQuery({
    queryKey: ["getAdminPayment"],
    queryFn: getAdminPayments,
    retry: false,
    refetchOnWindowFocus: true,
  });
