import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
    const session = await auth();
    if (!session?.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const reviews = await prisma.review.findMany({
        where: {
            booking: {
                account: { email: session.user.email }
            }
        },
        include: {
            booking: {
                include: {
                    mobil: {
                        select: {
                            merek: true,
                            model: true
                        }
                    }
                }
            }
        }
    });

    return NextResponse.json(reviews);
}

export async function PUT(request: Request) {
    const session = await auth();
    if (!session?.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();
    const { bookingId, rating, ulasan } = data;

    // Verify the review belongs to the user
    const booking = await prisma.booking.findUnique({
        where: { id: bookingId },
        select: { account: true }
    });

    if (!booking || booking.account?.email !== session.user.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const updatedReview = await prisma.review.update({
        where: { bookingId },
        data: { rating, ulasan }
    });

    return NextResponse.json(updatedReview);
}
