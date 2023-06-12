export function toStringCookies(cookies) {
  let strCookie = "";
  cookies.getAll().forEach((item: any) => {
    strCookie += `${item?.name}=${item?.value}; `;
  });
  return strCookie;
}
