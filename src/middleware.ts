import { NextResponse } from "next/server";
import { auth } from "@/auth";

// export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/chats/:chatid*"],
};

export default auth((req) => {
  if (!req.auth) {
    // Capture the original URL
    const originalUrl = req.nextUrl.pathname + req.nextUrl.search;

    // Redirect to the sign-in page with the original URL as a query parameter
    const signInUrl = new URL("/api/auth/signin", req.url);
    signInUrl.searchParams.set("callbackUrl", originalUrl);

    return NextResponse.redirect(signInUrl);
  }

  // Allow the request to proceed if authenticated
  return NextResponse.next();
});