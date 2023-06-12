import { userPaymentTHeads } from "@/constants/tabelHead";
import { persianNumberWithCommas } from "@/utils/toPersianNumber";
import { ToLocalDate } from "@/utils/toLocalDate";

const PaymentTable = ({ payments }) => {
  return (
    <div className="overflow-auto">
      <table className="border-collapse w-full table-auto text-sm min-w-[800px]">
        <thead>
          <tr className="whitespace-nowrap">
            {userPaymentTHeads.map((item) => (
              <th className="table__th" key={item.id}>
                {item.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {payments.map((payment, index) => {
            return (
              <tr key={payment._id}>
                <td className="table__td">{index}</td>
                <td className="table__td whitespace-nowrap truncate">
                  {payment.invoiceNumber}
                </td>
                <td className="table__td max-w-[280px] whitespace-nowrap truncate">
                  {payment.description}
                </td>
                <td className="table__td">
                  <div className="flex flex-col gap-y-2 items-start">
                    {payment.cart.productDetail.map((item) => {
                      return (
                        <div
                          className="px-2 py-0.5 bg-secondary-600 text-white rounded-xl whitespace-nowrap"
                          key={item._id}
                        >
                          {item.title}
                        </div>
                      );
                    })}
                  </div>
                </td>
                <td className="table__td">
                  {persianNumberWithCommas(payment.amount)}
                </td>
                <td className="table__td ">{ToLocalDate(payment.createdAt)}</td>
                <td className="table__td">
                  {payment.status === "COMPLETED" ? (
                    <span className="bg-green-500 text-white px-2 py-0.5 rounded-xl">
                      موفق
                    </span>
                  ) : (
                    <span className="bg-rose-500 text-white px-2 py-0.5 rounded-xl">
                      ناموفق
                    </span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentTable;
