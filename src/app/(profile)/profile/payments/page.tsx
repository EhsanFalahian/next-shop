"use client";
import { userPaymentTHeads } from "@/constants/tabelHead";
import { useGetUser } from "@/hooks/useAuth";
import { persianNumberWithCommas } from "@/utils/toPersianNumber";
import { ToLocalDate } from "@/utils/toLocalDate";
import Loading from "@/common/Loading";
import PaymentTable from "@/app/(profile)/profile/payments/PaymentTable";

const PaymentPage = () => {
  const { data, isLoading } = useGetUser();
  const { user, payments } = data || {};
  if (isLoading) return <Loading />;
  return (
    <div>
      <h1 className="font-bold m-8">سفارشات کاربر</h1>
      <PaymentTable payments={payments} />
    </div>
  );
};

export default PaymentPage;
