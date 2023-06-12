"use client";
import { useGetAdminPayment, useGetUser } from "@/hooks/useAuth";
import Loading from "@/common/Loading";
import PaymentTable from "@/app/(profile)/profile/payments/PaymentTable";
import AdminPaymentTable from "@/app/(admin)/admin/payments/paymentTable";
import { useGetCoupons } from "@/hooks/useCoupon";
import CouponTable from "@/app/(admin)/admin/coupons/couponTable";
import Link from "next/link";

const Page = () => {
  const { data, isLoading } = useGetCoupons();
  const { coupons } = data || {};
  if (isLoading) return <Loading />;
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-bold m-8">کد های تخفیف</h1>
        <Link href={"/admin/coupons/add"} className="text-primary-800">
          اضافه کردن کد تخفیف{" "}
        </Link>
      </div>
      <CouponTable coupons={coupons} />
    </div>
  );
};

export default Page;
