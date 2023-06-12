"use client";
import ProductForm from "@/components/ProductForm";
import { useParams, useRouter } from "next/navigation";
import { useGetProductsById, useUpdateProducts } from "@/hooks/useProducts";
import { useGetCategories } from "@/hooks/useCategory";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IncludeObj } from "@/utils/objectUtils";
import Loading from "@/common/Loading";
import { useMutation } from "@tanstack/react-query";

const includeEditKeys = [
  "title",
  "description",
  "slug",
  "brand",
  "price",
  "discount",
  "offPrice",
  "countInStock",
  "imageLink",
];

const Page = () => {
  const params = useParams();
  const { data, isLoading: productLoading } = useGetProductsById(params.id);
  const { product } = data || {};
  const { data: categoryData } = useGetCategories();
  const router = useRouter();
  const { categories } = categoryData || {};
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
  const [selectedCategory, setSelectedCategory] = useState();
  const { isLoading, mutateAsync } = useUpdateProducts();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (product) {
      setTags(product.tags);
      setSelectedCategory(product.category);
      setFormData(IncludeObj(product, includeEditKeys));
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { message } = await mutateAsync({
        productId: product._id,
        data: { ...formData, tags, category: selectedCategory._id },
      });
      toast.success(message);
      router.push("/admin/products");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  if (productLoading) return <Loading />;
  return (
    <div className="space-y-6">
      <h1 className="font-bold mb-4 text-xl">ویرایش محصول</h1>
      <ProductForm
        productData={formData}
        productDataChange={handleChange}
        onSubmit={handleSubmit}
        categories={categories}
        setSelectedCategory={setSelectedCategory}
        setTags={setTags}
        tags={tags}
        selectedValue={product.category}
      />
    </div>
  );
};

export default Page;
