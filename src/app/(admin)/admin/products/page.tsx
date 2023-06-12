"use client";
import { useGetProducts } from "@/hooks/useProducts";
import Loading from "@/common/Loading";
import ProductsTable from "@/app/(admin)/admin/products/ProductsTable";
import Link from "next/link";
const Page = () => {
  const { isLoading, data } = useGetProducts();
  const { products } = data || {};
  if (isLoading) return <Loading />;
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-bold m-8">محصولات</h1>
        <Link href={"/admin/products/add"} className="text-primary-800">
          اضافه کردن محصول{" "}
        </Link>
      </div>
      <ProductsTable products={products} />
    </div>
  );
};

export default Page;
