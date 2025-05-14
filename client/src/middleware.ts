import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  console.log(request.nextUrl.pathname, 'path')
  if (request.nextUrl.pathname?.startsWith("/user")) {
    if (!token) {
      return NextResponse.redirect(new URL(`/login`, request.url));
    }
    return NextResponse.next();
  }
}
