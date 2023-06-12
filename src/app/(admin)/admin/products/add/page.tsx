"use client";
import TextField from "@/common/TextField";
import { useState } from "react";
import { useGetCategories } from "@/hooks/useCategory";
import { TagsInput } from "react-tag-input-component";
import Select from "react-select";
import { useAddProducts } from "@/hooks/useProducts";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import ProductForm from "@/components/ProductForm";

const AddProductsPage = () => {
  const { isLoading, mutateAsync } = useAddProducts();
  const { data } = useGetCategories();
  const router = useRouter();
  const { categories } = data || {};
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    slug: "",
    brand: "",
    price: "",
    discount: "",
    offPrice: "",
    countInStock: "",
    imageLink: "",
  });
  const [tags, setTags] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { message } = await mutateAsync({
        ...formData,
        tags,
        category: selectedCategory._id,
      });
      toast.success(message);
      router.push("/admin/products");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <div className="space-y-6">
      <h1 className="font-bold mb-4 text-xl">اضافه کردن محصول</h1>
      <ProductForm
        productData={formData}
        productDataChange={handleChange}
        onSubmit={handleSubmit}
        categories={categories}
        setSelectedCategory={setSelectedCategory}
        setTags={setTags}
        tags={tags}
      />
    </div>
  );
};

export default AddProductsPage;
