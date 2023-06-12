"use client";
import { useGetUsers } from "@/hooks/useAuth";
import PaymentTable from "@/app/(profile)/profile/payments/PaymentTable";
import UsersTable from "@/app/(admin)/admin/users/UsersTable";
import Loading from "@/common/Loading";

const Users = () => {
  const { isLoading, data } = useGetUsers();
  const { users } = data || {};
  if (isLoading) return <Loading />;
  return (
    <div>
      <h1 className="font-bold m-8">اطلاعات کاربران</h1>
      <UsersTable users={users} />
    </div>
  );
};

export default Users;
