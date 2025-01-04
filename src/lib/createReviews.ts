import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function createReviewsForCompletedBookings() {
    try {
        const today = new Date();
        today.setUTCHours(0, 0, 0, 0);

        const completedBookings = await prisma.booking.findMany({
            where: {
                end_date: {
                    lte: today
                },
                canceled: false,
                review: null // Ensure no review exists yet
            }
        });

        const createdReviews = await Promise.all(
            completedBookings.map(booking =>
                prisma.review.create({
                    data: {
                        bookingId: booking.id, // Set the foreign key
                        rating: null,
                        ulasan: null
                    }
                })
            )
        );

        console.log(`Created ${createdReviews.length} review entries`);
        return createdReviews;
    } catch (error) {
        console.error("Error creating review entries:", error);
        throw error;
    }
}
