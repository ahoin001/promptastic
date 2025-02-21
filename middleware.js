import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const token = await getToken({ req });
  const protectedRoutes = ["/update-prompt", "/create-prompt", "/profile"];

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
  matcher: ["/create-prompt", "/update-prompt", "/profile"], // Add more protected routes here
};
