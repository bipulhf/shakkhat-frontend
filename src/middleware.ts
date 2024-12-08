import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUserType, isLoggedIn } from "./actions/auth.action";

const publicRoutes = ["/login", "/signup"];

export async function middleware(request: NextRequest) {
  const userExist = await isLoggedIn();
  const userType = await getUserType();
  const isPublicRoute = publicRoutes.includes(request.nextUrl.pathname);

  if (!isPublicRoute && !userExist) {
    return NextResponse.redirect(new URL("/login", request.url));
  } else if (
    !isPublicRoute &&
    userType !== "Admin" &&
    request.nextUrl.pathname.startsWith("/admin")
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  } else if (
    !isPublicRoute &&
    userType === "Admin" &&
    !request.nextUrl.pathname.startsWith("/admin")
  ) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
