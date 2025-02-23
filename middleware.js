import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req });
  const protectedRoutes = ["/update-prompt", "/create-prompt"];

  if (
    !token &&
    protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))
  ) {
    return NextResponse.redirect(new URL("/", req.url)); // Redirect to home if not authorized
  }

  return NextResponse.next(); // Continue as normal if authorized
}

// Apply middleware only to specific routes
export const config = {
  matcher: ["/create-prompt", "/update-prompt"], // Add more protected routes here
};
