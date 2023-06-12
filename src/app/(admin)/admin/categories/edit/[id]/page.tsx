"use client";
import CategoryForm from "@/components/CategoryForm";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useGetProductsById } from "@/hooks/useProducts";
import { useGetCategoryById, useUpdateCategory } from "@/hooks/useCategory";
import Loading from "@/common/Loading";
import { IncludeObj } from "@/utils/objectUtils";

const includeCategoryKeys = ["title", "englishTitle", "description", "type"];

const Page = () => {
  const params = useParams();
  const { isLoading: categoryLoading, data } = useGetCategoryById(params.id);
  const { isLoading, mutateAsync } = useUpdateCategory();
  const { category } = data || {};
  const [categoryData, setCategoryData] = useState({
    title: "",
    type: "",
    description: "",
    englishTitle: "",
  });
  const router = useRouter();
  const handleChange = (e) => {
    setCategoryData({ ...categoryData, [e.target.name]: e.target.value });
  };
  const addCategoryHandler = async (e) => {
    e.preventDefault();
    console.log(categoryData);
    try {
      const { message } = await mutateAsync({
        productId: category._id,
        data: { ...categoryData },
      });
      toast.success(message);
      router.push("/admin/categories");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    if (category) setCategoryData(IncludeObj(category, includeCategoryKeys));
  }, [data]);

  if (categoryLoading) <Loading />;
  return (
    <div className="space-y-6">
      <h1 className="font-bold mb-4 text-xl">ویرایش دسته بندی</h1>
      <CategoryForm
        categoryData={categoryData}
        onSubmit={addCategoryHandler}
        categoryDataOnChange={handleChange}
      />
    </div>
  );
};

export default Page;
