import { userAdminTHeads, userPaymentTHeads } from "@/constants/tabelHead";
import { persianNumberWithCommas } from "@/utils/toPersianNumber";
import { ToLocalDate } from "@/utils/toLocalDate";
import Link from "next/link";
import { HiCheckCircle } from "react-icons/hi";

const UsersTable = ({ users }) => {
  return (
    <div className="overflow-auto">
      <table className="border-collapse w-full table-auto text-sm min-w-[800px]">
        <thead>
          <tr className="whitespace-nowrap">
            {userAdminTHeads.map((item) => (
              <th className="table__th" key={item.id}>
                {item.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            return (
              <tr key={user._id}>
                <td className="table__td">{index}</td>
                <td className="table__td whitespace-nowrap truncate">
                  {user.name}
                </td>
                <td className="table__td ">{user.email}</td>
                <div className="flex items-center">
                  <td className="table__td ">{user.phoneNumber}</td>
                  {user.isVerifiedPhoneNumber && (
                    <HiCheckCircle className="fill-green-400 w-6 h-6" />
                  )}
                </div>
                <td className="table__td">
                  <div className="flex flex-col gap-y-2 items-start">
                    {user.Products.map((item) => {
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
                <td className="table__td ">{ToLocalDate(user.createdAt)}</td>
                <td className="table__td font-bold">
                  <Link href={`/admin/users/${user._id}`}>مشاهده جزییات</Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
