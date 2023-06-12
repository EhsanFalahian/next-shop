import { productsListTHeads, userAdminTHeads } from "@/constants/tabelHead";
import { HiEye, HiTrash } from "react-icons/hi";
import Link from "next/link";
import { AiFillEdit } from "react-icons/ai";
import toast from "react-hot-toast";
import { useRemoveCategory } from "@/hooks/useCategory";
import { useRemoveProducts } from "@/hooks/useProducts";
import { useQueryClient } from "@tanstack/react-query";

const ProductsTable = ({ products }) => {
  const { mutateAsync, isLoading } = useRemoveProducts();
  const queryClient = useQueryClient();
  const removeProductHandler = async (id) => {
    try {
      const { message } = await mutateAsync(id);
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["getProducts"] });
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <div className="overflow-auto">
      <table className="border-collapse w-full table-auto text-sm min-w-[800px]">
        <thead>
          <tr className="whitespace-nowrap">
            {productsListTHeads.map((item) => (
              <th className="table__th" key={item.id}>
                {item.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => {
            return (
              <tr key={product._id}>
                <td className="table__td">{index}</td>
                <td className="table__td whitespace-nowrap truncate">
                  {product.title}
                </td>
                <td className="table__td ">{product?.category?.title}</td>
                <td className="table__td ">{product.price}</td>

                <td className="table__td">{product.discount}</td>
                <td className="table__td ">{product.offPrice}</td>
                <td className="table__td ">{product.countInStock}</td>
                <td className="table__td font-bold">
                  <div className="flex gap-x-4 items-center">
                    <Link href={`/admin/products/${product._id}`}>
                      <HiEye className="w-4 h-4 text-primary-800" />
                    </Link>
                    <button onClick={() => removeProductHandler(product._id)}>
                      <HiTrash className="w-4 h-4 text-rose-500" />
                    </button>
                    <Link href={`/admin/products/edit/${product._id}`}>
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

export default ProductsTable;
