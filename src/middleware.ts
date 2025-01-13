import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const AdminPath = ["/dashboard/overview", "/dashboard/manage", "/dashboard/reviews"];
const CustomerPath = ["/dashboard/profile", "/dashboard/orders", "/dashboard/cart"];

export const config: MiddlewareConfig = {
    matcher: "/dashboard/:path*"
};

export default async function middleware(req: NextRequest) {
    const token = await getToken({ req });
    if (!token) {
        return NextResponse.rewrite(new URL("/sign-in", req.url));
    }

    const pathname = req.nextUrl.pathname;
    const isAdminPage = AdminPath.includes(pathname);
    const isCustomerPage = CustomerPath.includes(pathname);

    if ((!token?.isAdmin && isAdminPage) || (token?.isAdmin && isCustomerPage)) {
        return NextResponse.rewrite(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
}
