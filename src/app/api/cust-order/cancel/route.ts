import { NextRequest, NextResponse } from "next/server";
import { StatusBooking } from "@prisma/client";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { bookingId } = await request.json();

        // Verify the booking belongs to the user and is eligible for cancellation
        const booking = await prisma.booking.findFirst({
            where: {
                id: bookingId,
                account: { email: session.user.email },
                startDate: { gt: new Date() }, // Only allow canceling future bookings
                status: {
                    not: StatusBooking.Canceled
                }
            }
        });

        if (!booking) {
            return NextResponse.json(
                { error: "Booking not found or cannot be canceled" },
                { status: 404 }
            );
        }

        // Update the booking
        const updatedBooking = await prisma.booking.update({
            where: { id: bookingId },
            data: { status: StatusBooking.Canceled }
        });

        return NextResponse.json(updatedBooking);
    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
