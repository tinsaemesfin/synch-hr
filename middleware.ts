import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  // Get the pathname of the request (e.g. /, /protected)
  const path = req.nextUrl.pathname;

  // If it's the root path, just render it

  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (
    !session &&
    (path === "/" || path.startsWith("/admin") || path.startsWith("/t"))
  ) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }
  // else if(session && session.role === "superAdmin" && session.tenantId ==='64d2210a1be452ef56c8eb6c' && !path.startsWith('/admin')){
  //   return NextResponse.redirect(new URL("/admin", req.url));
  // }
  else if (session && (path === "/signin" || path === "/signup")) {
    return NextResponse.redirect(new URL("/", req.url));
  } else if (
    session &&
    session.role === "superAdmin" &&
    session.tenantId === "64d7c305906173fe8c5c1791" &&
    !path.startsWith("/admin")
  ) {
    return NextResponse.redirect(new URL("/admin", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/signin", "/signup", "/admin", "/api"],
};
