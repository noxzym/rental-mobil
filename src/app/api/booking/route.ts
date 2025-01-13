import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get("status");
    const id = searchParams.get("id");
    const today = new Date();

    try {
        // Handle single booking fetch
        if (id) {
            const booking = await prisma.booking.findUnique({
                where: { id },
                include: {
                    account: true,
                    mobil: true,
                    kabukota: true
                }
            });

            if (!booking) {
                return NextResponse.json({ error: "Booking not found" }, { status: 404 });
            }

            return NextResponse.json({
                id: booking.id,
                user: {
                    ...booking.account
                },
                car: {
                    ...booking.mobil
                },
                driver: booking.driver,
                schedule: {
                    startDate: booking.startDate.toISOString().split("T")[0],
                    endDate: booking.endDate.toISOString().split("T")[0],
                    pickupTime: booking.pickupTime.toISOString().split("T")[1].slice(0, 5)
                },
                destination: booking.kabukota?.nama,
                status: booking.status
            });
        }

        // Handle booking list fetch (existing code)
        let bookings;

        if (status === "completed") {
            bookings = await prisma.booking.findMany({
                where: {
                    endDate: { lt: today },
                    status: {
                        not: "CANCELED"
                    }
                },
                include: {
                    account: true
                }
            });
        } else if (status === "inProgress") {
            bookings = await prisma.booking.findMany({
                where: {
                    startDate: { lte: today },
                    endDate: { gte: today },
                    status: {
                        not: "CANCELED"
                    }
                },
                include: {
                    account: true
                }
            });
        } else if (status === "incoming") {
            bookings = await prisma.booking.findMany({
                where: {
                    startDate: { gt: today },
                    status: {
                        not: "CANCELED"
                    }
                },
                include: {
                    account: true
                }
            });
        } else if (status === "canceled") {
            bookings = await prisma.booking.findMany({
                where: {
                    status: "CANCELED"
                },
                include: {
                    account: true
                }
            });
        } else {
            return NextResponse.json({ error: "Invalid status parameter" }, { status: 400 });
        }

        const response = bookings.map(booking => ({
            id: booking.id,
            userName: booking.account?.nama,
            userId: booking.account?.id,
            startDate: booking.startDate.toISOString().split("T")[0],
            endDate: booking.endDate.toISOString().split("T")[0],
            status:
                status === "completed"
                    ? "Selesai"
                    : status === "inProgress"
                      ? "Sedang Berjalan"
                      : status === "incoming"
                        ? "Akan Datang"
                        : "Canceled"
        }));

        return NextResponse.json(response);
    } catch (error) {
        console.error("Error fetching bookings:", error);
        return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
    }
}
