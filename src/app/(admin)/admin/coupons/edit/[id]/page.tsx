"use client";
import CouponForm from "@/components/CouponForm";
import { useGetProducts } from "@/hooks/useProducts";
import { useGetOneCoupon, useUpdateCoupons } from "@/hooks/useCoupon";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loading from "@/common/Loading";

const Page = () => {
  const { id } = useParams();
  const { isLoading: couponLoading, data: couponData } = useGetOneCoupon(id);
  const { coupon } = couponData || {};
  const { data } = useGetProducts();
  const { isLoading, mutateAsync } = useUpdateCoupons();
  const { products } = data || {};
  const router = useRouter();
  const [formData, setFormData] = useState({});

  const [type, setType] = useState();
  const [product, setProduct] = useState([]);
  const [expireDate, setExpireDate] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (couponData) {
      setType(coupon.type);
      setExpireDate(coupon.createdAt);
      setFormData({
        code: coupon.code,
        amount: coupon.amount,
        usageLimit: coupon.usageLimit,
      });
      setProduct(coupon.productIds);
    }
  }, [coupon]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { message } = await mutateAsync({
        id: coupon._id,
        data: {
          ...formData,
          type: type,
          expireDate: expireDate,
          productIds: product.map((p) => p._id),
        },
      });
      toast.success(message);
      router.push("/admin/coupons");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  if (couponLoading) return <Loading />;
  return (
    <div className="space-y-6">
      <h1 className="font-bold mb-4 text-xl">ویرایش کدتخفیف</h1>
      <CouponForm
        type={type}
        setType={type}
        formData={formData}
        products={products}
        setProduct={setProduct}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        expireDate={expireDate}
        setExpireDate={setExpireDate}
        isLoading={isLoading}
        defaultValue={coupon.productIds}
      />
    </div>
  );
};
export default Page;
