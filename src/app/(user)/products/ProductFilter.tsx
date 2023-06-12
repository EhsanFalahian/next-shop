"use client";
import CheckBox from "@/common/CheckBox";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

const ProductFilter = ({ categories }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [selectedCategories, setSelectedCategories] = useState(
    searchParams.get("category")?.split(",") || []
  );
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );
  const checkHandler = (e: any) => {
    const value = e.target.value;
    if (selectedCategories.includes(value)) {
      const categories = selectedCategories.filter((item) => item !== value);
      setSelectedCategories(categories);
      router.push(
        pathname + "?" + createQueryString("category", categories.toString())
      );
    } else {
      setSelectedCategories([...selectedCategories, value]);
      router.push(
        pathname +
          "?" +
          createQueryString(
            "category",
            [...selectedCategories, value].toString()
          )
      );
    }
  };
  return (
    <div>
      <p className="font-bold mb-4">دسته بندی ها</p>
      <ul className="space-y-4">
        {categories.map((category: any) => {
          return (
            <CheckBox
              label={category.title}
              value={category.englishTitle}
              name="product-type"
              id={category._id}
              key={category._id}
              checked={selectedCategories.includes(category.englishTitle)}
              onChange={checkHandler}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default ProductFilter;
