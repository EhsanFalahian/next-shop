"use client";
import { useGetProducts } from "@/hooks/useProducts";
import Loading from "@/common/Loading";
import ProductsTable from "@/app/(admin)/admin/products/ProductsTable";
import Link from "next/link";
import { useGetCategories } from "@/hooks/useCategory";
import CategoriesTable from "@/app/(admin)/admin/categories/CategoriesTable";
const Page = () => {
  const { isLoading, data } = useGetCategories();
  const { categories } = data || {};
  if (isLoading) return <Loading />;
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-bold m-8">دسته بندی ها</h1>
        <Link href={"/admin/categories/add"} className="text-primary-800">
          اضافه کردن دسته بندی{" "}
        </Link>
      </div>
      <CategoriesTable categories={categories} />
      {/*<ProductsTable products={products} />*/}
    </div>
  );
};

export default Page;
