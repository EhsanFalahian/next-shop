"use client";
import Link from "next/link";
import { logout } from "@/services/AuthServices";

const SideBar = () => {
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
          <Link href={"/profile"}>داشبورد</Link>
        </li>
        <li>
          <Link href={"/profile/me"}>اطلاعات کاربری</Link>
        </li>
        <li>
          <Link href={"/profile/payments"}>تاریخچه سفارشات</Link>
        </li>
        <li>
          <button onClick={exitHandler}>خروچ از حساب کاربری</button>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
