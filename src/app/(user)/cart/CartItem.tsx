import { HiMinus, HiOutlineTrash, HiPlus } from "react-icons/hi";
import { UseAddToCart, UseDecrementFromCart } from "@/hooks/useCart";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import {
  persianNumberWithCommas,
  ToPersianNumber,
} from "@/utils/toPersianNumber";
const CartItem = ({ cartItem }) => {
  const { mutateAsync } = UseAddToCart();
  const { mutateAsync: decrementMutation } = UseDecrementFromCart();
  const queryClient = useQueryClient();

  const addToCartHandler = async () => {
    try {
      const { message } = await mutateAsync(cartItem._id);
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["getUser"] });
    } catch (error: any) {
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      }
    }
  };
  const decrementFromCartHandler = async () => {
    try {
      const { message } = await decrementMutation(cartItem._id);
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["getUser"] });
    } catch (error: any) {
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      }
    }
  };
  return (
    <div className="flex justify-between items-center border p-4 rounded-xl">
      <p className="flex-1">{cartItem.title}</p>
      <div className="flex flex-1 justify-between items-center gap-x-8">
        <div>
          <p className="mb-2">
            قیمت:{" "}
            <span
              className={`${
                cartItem.discount ? "line-through text-gray-500" : "font-bold"
              }`}
            >
              {persianNumberWithCommas(cartItem.price)}
            </span>
          </p>
          {!!cartItem.discount && (
            <div className="flex items-center gap-x-2 mb-2">
              <p className=" font-bold">{cartItem.offPrice}</p>
              <div className="py-0.5 px-2 items-center bg-rose-500 rounded-xl text-white text-sm">
                {ToPersianNumber(cartItem.discount)} %
              </div>
            </div>
          )}
        </div>
        <span>تعداد : {ToPersianNumber(cartItem.quantity)}</span>
        <div className="flex gap-x-3">
          <button
            onClick={addToCartHandler}
            className="bg-primary-800 text-white rounded p-1 "
          >
            <HiPlus className="h-4 w-4" />
          </button>
          {/*<button>*/}
          {/*  <HiOutlineTrash className="text-rose-500 w-6 h-6 " />*/}
          {/*</button>*/}
          <button
            onClick={decrementFromCartHandler}
            className="border rounded p-1 "
          >
            {cartItem.quantity > 1 ? (
              <HiMinus className="h-4 w-4" />
            ) : (
              <HiOutlineTrash className="text-rose-500 w-6 h-6 " />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
export default CartItem;
