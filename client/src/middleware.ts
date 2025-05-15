import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const user = cookieStore.get("user")?.value;
  const authRoutes = ["/signup", "/login"];

  if (request.nextUrl.pathname?.startsWith("/user")) {
    if (!token) {
      return NextResponse.redirect(new URL(`/login`, request.url));
    }
    return NextResponse.next();
  }
  if (authRoutes.includes(request.nextUrl.pathname) && token) {
    return NextResponse.redirect(new URL(`/dashboard`, request.url));
  }
}
