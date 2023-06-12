"use client";
import { useGetAdminPayment, useGetUser } from "@/hooks/useAuth";
import Loading from "@/common/Loading";
import PaymentTable from "@/app/(profile)/profile/payments/PaymentTable";
import AdminPaymentTable from "@/app/(admin)/admin/payments/paymentTable";

const Page = () => {
  const { data, isLoading } = useGetAdminPayment();
  const { user, payments } = data || {};
  if (isLoading) return <Loading />;
  return (
    <div>
      <h1 className="font-bold m-8">سفارشات</h1>
      <AdminPaymentTable payments={payments} />
    </div>
  );
};

export default Page;
