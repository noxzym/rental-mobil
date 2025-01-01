import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(auth);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const reviews = await prisma.review.findMany({
      where: {
        booking: {
          userEmail: session.user.email
        }
      },
      include: {
        booking: {
          include: {
            mobil: {
              select: {
                merek: true,
                model: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(auth);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    const { bookingId, rating, ulasan } = data;

    // Verify the review belongs to the user
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      select: { userEmail: true }
    });

    if (!booking || booking.userEmail !== session.user.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const updatedReview = await prisma.review.update({
      where: { bookingId },
      data: { rating, ulasan },
    });

    return NextResponse.json(updatedReview);
  } catch (error) {
    console.error('Error updating review:', error);
    return NextResponse.json(
      { error: 'Failed to update review' },
      { status: 500 }
    );
  }
}