import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// Add this to see exactly what's happening
export default withAuth(
  async function middleware(req) {
    // console.log("Middleware executing");
    
    const pathname = req.nextUrl.pathname;
    const token = req.nextauth.token;
    
    // console.log({
    //   pathname,
    //   token,
    //   isAdmin: token?.admin
    // });

    if (pathname.startsWith("/admin-dashboard")) {
      if (!token?.admin) {
        // console.log("Redirecting - not admin");
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // console.log("Auth callback token:", token);
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ["/admin-dashboard/:path*"]
};