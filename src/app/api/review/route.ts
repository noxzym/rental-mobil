import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const reviews = await prisma.review.findMany({
            where: {
                rating: {
                    gte: 1,
                    lte: 5
                }
            },
            include: {
                booking: {
                    include: {
                        account: true
                    }
                }
            }
        });

        const formattedReviews = reviews.map(review => ({
            id: review.id,
            bookingId: review.bookingId,
            userName: review.booking.account?.nama || "Anonymous",
            text: review.ulasan || "",
            rating: review.rating || 0
        }));

        return NextResponse.json(formattedReviews);
    } catch (error) {
        console.error("Error fetching reviews:", error);
        return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
    }
}
