"use client";
import { useGetUser } from "@/hooks/useAuth";
import Link from "next/link";
import CartItem from "@/app/(user)/cart/CartItem";
import Loading from "@/common/Loading";
import CartSummary from "@/app/(user)/cart/CartSummary";

const CartPage = () => {
  const { data, isLoading } = useGetUser();
  const { user, cart } = data || {};
  console.log(cart);

  if (isLoading) return <Loading />;

  if (!user)
    return (
      <div className="container lg:max-w-screen-lg">
        <p className="font-bold mb-4">
          برای مشاهده سبد خرید لطفا ابتدا لاگین کنید
        </p>
        <Link href={"/auth"} className="text-lg font-bold text-primary-800">
          رفتن به صفحه لاگین
        </Link>
      </div>
    );

  if (!user?.cart?.products || user?.cart?.products.length === 0)
    return (
      <div className="container lg:max-w-screen-lg">
        <p className="font-bold mb-4">سبد خرید شما خالی است</p>
        <Link href={"/products"} className="text-lg font-bold text-primary-800">
          رفتن به صفحه محصولات
        </Link>
      </div>
    );
  return (
    <div className="grid grid-cols-4 gap-x-4">
      <div className="space-y-4 col-span-3">
        {cart && cart.productDetail.map((item) => <CartItem cartItem={item} />)}
      </div>
      <div className="col-span-1">
        <CartSummary payDetail={cart.payDetail} />
      </div>
    </div>
  );
};

export default CartPage;
