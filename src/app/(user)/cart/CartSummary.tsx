import { persianNumberWithCommas } from "@/utils/toPersianNumber";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { creatPayment } from "@/services/CartServices";
import toast from "react-hot-toast";

const CartSummary = ({ payDetail }: any) => {
  const { totalGrossPrice, totalOffAmount, totalPrice } = payDetail;
  const queryClient = useQueryClient();
  const { isLoading, mutateAsync } = useMutation({ mutationFn: creatPayment });

  const paymentHandler = async () => {
    try {
      const { message } = await mutateAsync();
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["getUser"] });
    } catch (error: any) {
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      }
    }
  };
  return (
    <div className="border rounded p-2">
      <p className="font-bold mb-4">اطلاعات سفارش</p>
      <div className="flex items-center justify-between mb-4">
        <span>مبلغ کل</span>
        <span>{persianNumberWithCommas(totalGrossPrice)}</span>
      </div>
      <div className="flex items-center justify-between mb-4">
        <span> تخفیف</span>
        <span>{persianNumberWithCommas(totalOffAmount)}</span>
      </div>
      <div className="flex items-center justify-between mb-4 font-bold">
        <span>مبلغ قابل پرداخت</span>
        <span>{persianNumberWithCommas(totalPrice)}</span>
      </div>
      <button onClick={paymentHandler} className="btn btn--primary w-full">
        ثبت سفارش
      </button>
    </div>
  );
};

export default CartSummary;
