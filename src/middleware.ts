import { NextRequest, NextResponse } from "next/server";
import MiddlewareAuth from "@/utils/middlewareAuth";

export async function middleware(req: NextRequest) {
  const url = req.url;
  const pathname = req.nextUrl.pathname;

  if (pathname.startsWith("/admin")) {
    const user = await MiddlewareAuth(req);
    console.log(!user);
    if (!user) return NextResponse.redirect(new URL("/auth", req.url));
    if (user.role !== "ADMIN")
      return NextResponse.redirect(new URL("/", req.url));
  }
  if (pathname.startsWith("/profile")) {
    const user = await MiddlewareAuth(req);
    console.log(!user);
    if (!user) return NextResponse.redirect(new URL("/auth", req.url));
  }
}

export const config = {
  matcher: ["/admin", "/profile"],
};
