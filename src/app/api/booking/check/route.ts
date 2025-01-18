import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST() {
    try {
        const session = await auth();

        if (!session?.user?.email) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const user = await prisma.account.findUnique({
            where: {
                email: session.user.email
            }
        });

        if (!user) {
            return new NextResponse("User not found", { status: 404 });
        }

        if (user.isAdmin) {
            return new NextResponse("Admins cannot make bookings", { status: 403 });
        }

        if (!user.alamat || !user.detailAlamat || !user.noTelepon) {
            return new NextResponse("Incomplete profile", { status: 403 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}