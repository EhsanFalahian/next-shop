import {
  categoriesListTHeads,
  productsListTHeads,
  userAdminTHeads,
} from "@/constants/tabelHead";
import { HiEye, HiTrash } from "react-icons/hi";
import Link from "next/link";
import { AiFillEdit } from "react-icons/ai";
import { useRemoveCategory } from "@/hooks/useCategory";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

const CategoriesTable = ({ categories }) => {
  const queryClient = useQueryClient();
  const { mutateAsync, isLoading } = useRemoveCategory();
  const removeCategoryHandler = async (id) => {
    try {
      const { message } = await mutateAsync(id);
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["getCategories"] });
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <div className="overflow-auto">
      <table className="border-collapse w-full table-auto text-sm min-w-[800px]">
        <thead>
          <tr className="whitespace-nowrap">
            {categoriesListTHeads.map((item) => (
              <th className="table__th" key={item.id}>
                {item.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => {
            return (
              <tr key={category._id}>
                <td className="table__td">{index}</td>
                <td className="table__td whitespace-nowrap truncate">
                  {category.title}
                </td>
                <td className="table__td">{category.description}</td>
                <td className="table__td ">{category.englishTitle}</td>
                <td className="table__td ">{category.type}</td>
                <td className="table__td font-bold">
                  <div className="flex gap-x-4 items-center">
                    <Link href={`/admin/categories/${category._id}`}>
                      <HiEye className="w-4 h-4 text-primary-800" />
                    </Link>
                    <button onClick={() => removeCategoryHandler(category._id)}>
                      <HiTrash className="w-4 h-4 text-rose-500" />
                    </button>
                    <Link href={`/admin/categories/edit/${category._id}`}>
                      <AiFillEdit className="w-4 h-4 text-secondary-500" />
                    </Link>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CategoriesTable;
