import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  // Get the pathname of the request (e.g. /, /protected)
  const path = req.nextUrl.pathname;

  // If it's the root path, just render it

  const session = await getToken({
    req,
  });
  const requestHeaders = new Headers(req.headers);
  console.log('session => ', session)

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
  } else if (path.startsWith("/api/employee") && session) {
    const tenantId = session ?? requestHeaders.get("token");
    requestHeaders.set("token", String(tenantId));
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }
   else if (path.startsWith("/employee") && !session) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/signin", "/signup", "/admin", "/api", "/t"],
};
