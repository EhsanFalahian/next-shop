import { toStringCookies } from "@/utils/toStringCookies";

export default async function MiddlewareAuth(req: any) {
  const { data } = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/user/profile`,
    {
      method: "Get",
      credentials: "include",
      headers: {
        Cookie: toStringCookies(req.cookies),
      },
    }
  ).then((res) => res.json());
  const { user } = data || {};
  return user;
}
