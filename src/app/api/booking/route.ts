import { NextRequest, NextResponse } from "next/server";
import { StatusBooking, StatusMobil } from "@prisma/client";
import { number } from "zod";
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
                        not: StatusBooking.Canceled
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
                        not: StatusBooking.Canceled
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
                        not: StatusBooking.Canceled
                    }
                },
                include: {
                    account: true
                }
            });
        } else if (status === "canceled") {
            bookings = await prisma.booking.findMany({
                where: {
                    status: StatusBooking.Canceled
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

export async function POST(request: NextRequest) {
    const searchParams = await request.json();

    try {
        // First, verify that the car exists and is available
        const car = await prisma.mobil.findFirst({
            where: {
                id: searchParams["mobil_id"],
                status: StatusMobil.Ready
            }
        });

        if (!car) {
            return NextResponse.json(
                { error: "Car not available or doesn't exist" },
                { status: 400 }
            );
        }

        // Create the booking and update car status in a transaction
        const booking = await prisma.$transaction(async tx => {
            // Update car status to BOOKED
            await tx.mobil.update({
                where: { id: searchParams["mobil_id"] },
                data: { status: StatusMobil.Booked }
            });

            // Create the booking
            return await tx.booking.create({
                data: {
                    account: {
                        connect: { email: searchParams["email"] }
                    },
                    kabukota: {
                        connect: { id: searchParams["kabukota_tujuan"] }
                    },
                    pickupTime: new Date(searchParams["pickup_time"]),
                    driver: searchParams["driver"],
                    startDate: new Date(Number(searchParams["start_date"])),
                    endDate: new Date(Number(searchParams["end_date"])),
                    mobil: {
                        connect: { id: searchParams["mobil_id"] }
                    },
                    status: StatusBooking.OnGoing
                }
            });
        });

        return NextResponse.json(booking);
    } catch (error) {
        console.error("Error creating booking:", error);
        return NextResponse.json({ error: "Failed to create booking" }, { status: 500 });
    }
}
