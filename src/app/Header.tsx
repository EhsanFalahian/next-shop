"use client";

import Link from "next/link";
import { useGetUser } from "@/hooks/useAuth";

const Header = () => {
  const { data, error, isLoading } = useGetUser();
  const { user, cart } = data || {};
  console.log(data);
  return (
    <header
      className={`shadow-md mb-10 sticky top-0 transition-all duration-200 ${
        isLoading ? "blur-sm opacity-60" : "blur-none opacity-100"
      }`}
    >
      <nav>
        <ul className="flex items-center justify-between py-2 container xl:max-w-screen-xl">
          <li>
            <Link className="block py-2" href={"/"}>
              خانه
            </Link>
          </li>
          <li>
            <Link className="block py-2" href={"/products"}>
              محصولات
            </Link>
          </li>
          <li>
            <Link className="block py-2" href={"/profile"}>
              پروفایل
            </Link>
          </li>
          <li>
            <Link className="block py-2" href={"/admin"}>
              پنل ادمین
            </Link>
          </li>
          <li>
            <Link className="block py-2" href={"/cart"}>
              سبد خرید - ({cart && cart.payDetail.productIds.length})
            </Link>
          </li>
          <li>
            <div>
              {user ? (
                <span>{user.name}</span>
              ) : (
                <Link className="block py-2" href={"/auth"}>
                  ورود
                </Link>
              )}
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
