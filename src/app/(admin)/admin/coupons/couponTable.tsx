import {
  adminPaymentTHeads,
  couponListTHeads,
  userPaymentTHeads,
} from "@/constants/tabelHead";
import {
  persianNumberWithCommas,
  ToPersianNumber,
} from "@/utils/toPersianNumber";
import { ToLocalDate } from "@/utils/toLocalDate";
import Link from "next/link";
import { HiEye, HiTrash } from "react-icons/hi";
import { AiFillEdit } from "react-icons/ai";
import toast from "react-hot-toast";
import { useRemoveCoupon } from "@/hooks/useCoupon";
import { useQueryClient } from "@tanstack/react-query";

const CouponTable = ({ coupons }) => {
  const { mutateAsync } = useRemoveCoupon();
  const queryClient = useQueryClient();

  const removeHandler = async (id) => {
    try {
      const { message } = await mutateAsync(id);
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["getCoupons"] });
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <div className="overflow-auto">
      <table className="border-collapse w-full table-auto text-sm min-w-[800px]">
        <thead>
          <tr className="whitespace-nowrap">
            {couponListTHeads.map((item) => (
              <th className="table__th" key={item.id}>
                {item.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {coupons.map((coupon, index) => {
            return (
              <tr key={coupon._id}>
                <td className="table__td">{index}</td>
                <td className="table__td whitespace-nowrap truncate">
                  {coupon.code}
                </td>
                <td className="table__td max-w-[280px] whitespace-nowrap truncate">
                  {coupon.type}
                </td>
                <td className="table__td max-w-[280px] whitespace-nowrap truncate">
                  {persianNumberWithCommas(coupon.amount)}
                </td>
                <td className="table__td">
                  <div className="flex flex-col">
                    {coupon.productIds.map((item) => (
                      <span>{item.title}</span>
                    ))}
                  </div>
                </td>
                <td className="table__td">
                  {ToPersianNumber(coupon.usageCount)}
                </td>
                <td className="table__td">
                  {ToPersianNumber(coupon.usageLimit)}
                </td>
                <td className="table__td ">{ToLocalDate(coupon.createdAt)}</td>
                <td className="table__td font-bold">
                  <div className="flex gap-x-4 items-center">
                    <Link href={`/admin/coupons/${coupon._id}`}>
                      <HiEye className="w-4 h-4 text-primary-800" />
                    </Link>
                    <button onClick={() => removeHandler(coupon._id)}>
                      <HiTrash className="w-4 h-4 text-rose-500" />
                    </button>
                    <Link href={`/admin/coupons/edit/${coupon._id}`}>
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

export default CouponTable;
