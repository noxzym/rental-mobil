import { NextRequest, NextResponse } from "next/server";
import { StatusBooking } from "@prisma/client";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
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
                account: {
                    email: session.user.email
                }
            },
            include: {
                mobil: true,
                kabukota: {
                    include: {
                        provinsi: true
                    }
                }
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
            account: { email: session.user.email },
            ...(status === "completed" && {
                endDate: { lt: new Date() },
                status: {
                    not: StatusBooking.Canceled
                }
            }),
            ...(status === "inProgress" && {
                startDate: { lte: new Date() },
                endDate: { gte: new Date() },
                status: {
                    not: StatusBooking.Canceled
                }
            }),
            ...(status === "incoming" && {
                startDate: { gt: new Date() },
                status: {
                    not: StatusBooking.Canceled
                }
            }),
            ...(status === "canceled" && { status: StatusBooking.Canceled })
        },
        include: {
            mobil: true
        },
        orderBy: {
            startDate: "desc"
        }
    });

    return NextResponse.json(bookings);
}
