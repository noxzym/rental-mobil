import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const searchParams = request.nextUrl.searchParams;
        const status = searchParams.get("status");
        const id = searchParams.get("id");
        const email = searchParams.get("email");

        // Verify the email matches the session
        if (email && email !== session.user.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // If ID is provided, fetch single booking detail
        if (id) {
            const booking = await prisma.booking.findFirst({
                where: {
                    id,
                    userEmail: session.user.email
                },
                include: {
                    mobil: true,
                    kabukota: true
                }
            });

            if (!booking) {
                return NextResponse.json({ error: "Booking not found" }, { status: 404 });
            }

            return NextResponse.json(booking);
        }

        // Otherwise, fetch list of bookings
        const bookings = await prisma.booking.findMany({
            where: {
                userEmail: session.user.email,
                ...(status === "completed" && { end_date: { lt: new Date() }, canceled: false }),
                ...(status === "inProgress" && {
                    start_date: { lte: new Date() },
                    end_date: { gte: new Date() },
                    canceled: false
                }),
                ...(status === "incoming" && { start_date: { gt: new Date() }, canceled: false }),
                ...(status === "canceled" && { canceled: true })
            },
            include: {
                mobil: {
                    select: {
                        id: true,
                        merek: true,
                        model: true,
                        warna: true,
                        no_plat: true,
                        harga: true // Add this line
                    }
                },
                kabukota: true
            },
            orderBy: {
                start_date: "desc"
            }
        });

        return NextResponse.json(bookings);
    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
