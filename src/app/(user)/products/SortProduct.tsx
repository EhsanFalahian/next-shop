import RadioInput from "@/common/RadioInput";
import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const SortProduct = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [sort, setSort] = useState("");

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  useEffect(() => {
    setSort(searchParams.get("sort"));
  }, [searchParams]);

  const sortHandler = (e) => {
    const value = e.target.value;
    setSort(value);
    router.push(pathname + "?" + createQueryString("sort", value));
  };
  const sortOptions = [
    {
      id: 1,
      value: "latest",
      label: "جدید ترین",
    },
    {
      id: 2,
      value: "earliest",
      label: "قدیمی ترین",
    },
    {
      id: 3,
      value: "popular",
      label: "محبوب ترین",
    },
  ];
  return (
    <div>
      <p className="font-bold mb-4">مرتب سازی بر اساس</p>
      <ul className="space-y-4">
        {sortOptions.map((option: any) => {
          return (
            <RadioInput
              label={option.label}
              value={option.value}
              name="sort-product"
              id={option.id}
              key={option.id}
              checked={sort == option.value}
              onChange={sortHandler}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default SortProduct;
