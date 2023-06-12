"use client";
import { useState } from "react";
import CategoryForm from "@/components/CategoryForm";
import { useAddCategory } from "@/hooks/useCategory";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Page = () => {
  const [categoryData, setCategoryData] = useState({
    title: "",
    type: "",
    description: "",
    englishTitle: "",
  });
  const { isLoading, mutateAsync } = useAddCategory();
  const router = useRouter();

  const handleChange = (e) => {
    setCategoryData({ ...categoryData, [e.target.name]: e.target.value });
  };

  const addCategoryHandler = async (e) => {
    e.preventDefault();
    console.log(categoryData);
    try {
      const { message } = await mutateAsync({ ...categoryData });
      toast.success(message);
      router.push("/admin/categories");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <div className="space-y-6">
      <h1 className="font-bold mb-4 text-xl">اضافه کردن دسته بندی</h1>
      <CategoryForm
        categoryData={categoryData}
        onSubmit={addCategoryHandler}
        categoryDataOnChange={handleChange}
      />
    </div>
  );
};
export default Page;
