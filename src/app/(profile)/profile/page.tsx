"use client";
import { useGetUser } from "@/hooks/useAuth";
import { ToLocalDate } from "@/utils/toLocalDate";
import PaymentTable from "@/app/(profile)/profile/payments/PaymentTable";
import Link from "next/link";

const Profile = () => {
  const { data, isLoading } = useGetUser();
  const { user, payments } = data || {};
  if (isLoading) return <div>Loading...</div>;
  return (
    <div>
      <h1>{user.name} خوش آمدی!</h1>
      <p>
        <span>تاریخ پیوستن :</span>
        <span>{ToLocalDate(user.createdAt)}</span>
      </p>
      <div className="border rounded-xl p-3 mt-8">
        <div className="flex items-center justify-between">
          <h1>سفارشات اخیر</h1>
          <Link className="text-primary-800" href={"/profile/payments"}>
            مشاهده همه سفارش ها
          </Link>
        </div>
        <PaymentTable
          payments={payments
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 3)}
        />
      </div>
    </div>
  );
};

export default Profile;
