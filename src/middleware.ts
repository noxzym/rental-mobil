import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const AuthPath = ["/auth"];
const AdminPath = ["/dashboard/overview", "/dashboard/manage", "/dashboard/reviews"];
const CustomerPath = ["/dashboard/profile", "/dashboard/orders", "/dashboard/cart"];

export const config: MiddlewareConfig = {
    matcher: ["/auth", "/dashboard/:path*"]
};

export default async function middleware(req: NextRequest) {
    const token = await getToken({ req });

    const pathname = req.nextUrl.pathname;
    const isAuthPage = AuthPath.includes(pathname);
    const isAdminPage = AdminPath.includes(pathname);
    const isCustomerPage = CustomerPath.includes(pathname);

    if (!token && !isAuthPage) {
        return NextResponse.redirect(new URL("/auth", req.url));
    }

    if (token && isAuthPage) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    if ((!token?.isAdmin && isAdminPage) || (token?.isAdmin && isCustomerPage)) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
}
