"use client";
import ProductFilter from "@/app/(user)/products/ProductFilter";
import SortProduct from "@/app/(user)/products/SortProduct";

const CategorySidebar = ({ categories }: any) => {
  return (
    <div className="col-span-1">
      <ProductFilter categories={categories} />
      <SortProduct />
    </div>
  );
};

export default CategorySidebar;
