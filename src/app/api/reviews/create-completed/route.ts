import { NextResponse } from 'next/server'
import createReviewsForCompletedBookings from '@/lib/createReviews'

export async function POST() {
  try {
    const reviews = await createReviewsForCompletedBookings();
    return NextResponse.json({ success: true, reviews });
  } catch (error: any) {
    console.error('API error:', error.message);
    return NextResponse.json(
      { error: error.message || 'Failed to create reviews' },
      { status: 500 }
    );
  }
}
