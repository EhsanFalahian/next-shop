"use client";
import Link from "next/link";
import { logout } from "@/services/AuthServices";

const AdminSideBar = () => {
  const exitHandler = async () => {
    await logout();
    document.location.href = "/";
  };
  return (
    <div>
      <ul className="flex flex-col space-y-8">
        <li>
          <Link href={"/"}>صفحه اصلی</Link>
        </li>
        <li>
          <Link href={"/admin"}>داشبورد</Link>
        </li>
        <li>
          <Link href={"/admin/users"}>کاربران</Link>
        </li>
        <li>
          <Link href={"/admin/products"}>محصولات</Link>
        </li>
        <li>
          <Link href={"/admin/categories"}>دسته بندی ها</Link>
        </li>
        <li>
          <Link href={"/admin/payments"}>سفارشات</Link>
        </li>
        <li>
          <Link href={"/admin/coupons"}>کد تخفیف</Link>
        </li>
        <li>
          <button onClick={exitHandler}>خروچ از حساب کاربری</button>
        </li>
      </ul>
    </div>
  );
};

export default AdminSideBar;
