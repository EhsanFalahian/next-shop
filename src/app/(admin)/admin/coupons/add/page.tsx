"use client";
import { useState } from "react";
import { useGetProducts } from "@/hooks/useProducts";
import { useAddCoupons } from "@/hooks/useCoupon";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import CouponForm from "@/components/CouponForm";

const Page = () => {
  const { data } = useGetProducts();
  const { isLoading, mutateAsync } = useAddCoupons();
  const { products } = data || {};
  const router = useRouter();
  const [formData, setFormData] = useState({
    code: "",
    amount: "",
    usageLimit: "",
  });

  const [type, setType] = useState();
  const [product, setProduct] = useState([]);
  const [expireDate, setExpireDate] = useState(new Date());

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { message } = await mutateAsync({
        ...formData,
        type: type,
        expireDate: expireDate,
        productIds: product.map((p) => p._id),
      });
      toast.success(message);
      router.push("/admin/coupons");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <div className="space-y-6">
      <h1 className="font-bold mb-4 text-xl">اضافه کردن کدتخفیف</h1>
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
      />
    </div>
  );
};

export default Page;
