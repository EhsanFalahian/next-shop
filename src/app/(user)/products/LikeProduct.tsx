"use client";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { likeProduct } from "@/services/ProductServices";
import toast from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";
const LikeProduct = ({ product }) => {
  const pathname = usePathname();
  const router = useRouter();
  const likeHandler = async () => {
    try {
      const { message } = await likeProduct(product._id);
      toast.success(message);
      router.refresh(pathname);
    } catch (error) {
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      }
    }
  };
  return (
    <div className="mb-4">
      <button onClick={likeHandler}>
        {product.isLiked ? (
          <AiFillLike className="w-6 h-6 fill-primary-800" />
        ) : (
          <AiOutlineLike className="w-6 h-6 text-secondary-800" />
        )}
      </button>
    </div>
  );
};

export default LikeProduct;
