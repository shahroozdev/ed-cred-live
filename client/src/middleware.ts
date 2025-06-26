import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const user = cookieStore.get("user")?.value;
  const authRoutes = ["/signup", "/login"];
  const protectedRoutes =["/category", "/users", "/feedback", "/forum", "/posts", "/roles", "/subcategory", "/admin-dashboard", "pricing", "/review", "/review-admin", "/setting", "/verify","/welcome"]
    const pathname = request.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  if (isProtectedRoute) {
    if (!token) {
      return NextResponse.redirect(new URL(`/login`, request.url));
    }
    return NextResponse.next();
  }
  if (authRoutes.includes(request.nextUrl.pathname) && token) {
    return NextResponse.redirect(new URL(`/dashboard`, request.url));
  }
}
