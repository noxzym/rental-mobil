import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { bookingId } = await request.json();

    // Verify the booking belongs to the user and is eligible for cancellation
    const booking = await prisma.booking.findFirst({
      where: {
        id: bookingId,
        userEmail: session.user.email,
        start_date: { gt: new Date() }, // Only allow canceling future bookings
        canceled: false
      },
    });

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found or cannot be canceled' }, { status: 404 });
    }

    // Update the booking
    const updatedBooking = await prisma.booking.update({
      where: { id: bookingId },
      data: { canceled: true },
    });

    return NextResponse.json(updatedBooking);
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}