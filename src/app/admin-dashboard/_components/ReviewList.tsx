'use client';

import { Card } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Review {
  id: string;
  bookingId: string;
  userName: string;
  text: string;
  rating: number;
}

export default function ReviewList() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('/api/review');
        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }
        const data = await response.json();
        setReviews(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch reviews');
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (isLoading) {
    return <div className="text-center py-4">Loading reviews...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>;
  }

  if (reviews.length === 0) {
    return <div className="text-center py-4">No reviews found</div>;
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <Card key={review.id} className="flex items-start gap-4 p-4">
          <div className="w-12 h-12 bg-green-500 rounded-full"></div>
          <div className="flex-1">
            <h3 className="font-medium">{review.userName}</h3>
            <p className="text-sm text-gray-500">Booking ID: {review.bookingId}</p>
            <p className="mt-2">{review.text}</p>
          </div>
          <div className="flex items-center gap-1">
            {Array.from({ length: review.rating }).map((_, idx) => (
              <Star key={idx} size={16} className="text-yellow-400" />
            ))}
            {Array.from({ length: 5 - review.rating }).map((_, idx) => (
              <Star key={idx} size={16} className="text-gray-300" />
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}