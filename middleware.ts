/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const role = request.cookies.get("userRole")?.value; // admin | user
  const { pathname } = request.nextUrl;

  const publicPaths = ["/auth/login", "/auth/signup"];
  const isPublicPath = publicPaths.includes(pathname);

  // 🔐 If not logged in
  if (!token && !isPublicPath) {
    const redirectUrl = new URL("/auth/login", request.url);
    redirectUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // 🔁 If logged in → Role check
  if (token) {
    // 👑 Admin routes
    if (pathname.startsWith("/admin") && role !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // 👤 User dashboard
    if (
      pathname.startsWith("/dashboard") &&
      role !== "user" &&
      role !== "admin"
    ) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"],
};
