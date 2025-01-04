"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReviewCard from "./ReviewCard";

interface Review {
    id: string;
    bookingId: string;
    rating: number | null;
    ulasan: string | null;
    booking: {
        mobil: {
            merek: string;
            model: string;
        };
    };
}

export default function CustReviewList() {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchReviews = async () => {
        try {
            const response = await fetch("/api/cust-review");
            if (!response.ok) throw new Error("Failed to fetch reviews");
            const data = await response.json();
            setReviews(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to fetch reviews");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    const handleSubmitReview = async (bookingId: string, rating: number, text: string) => {
        try {
            const response = await fetch("/api/cust-review", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ bookingId, rating, ulasan: text })
            });

            if (!response.ok) throw new Error("Failed to submit review");

            // Refresh the reviews list
            await fetchReviews();
        } catch (error) {
            console.error("Error submitting review:", error);
            throw error;
        }
    };

    if (isLoading) {
        return <div className="py-4 text-center">Loading reviews...</div>;
    }

    if (error) {
        return <div className="py-4 text-center text-red-500">{error}</div>;
    }

    const pendingReviews = reviews.filter(r => r.rating === null && r.ulasan === null);
    const completedReviews = reviews.filter(r => r.rating !== null && r.ulasan !== null);

    return (
        <Tabs defaultValue="pending" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="pending">Not Reviewed ({pendingReviews.length})</TabsTrigger>
                <TabsTrigger value="completed">Reviewed ({completedReviews.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="pending" className="mt-4 space-y-4">
                {pendingReviews.length === 0 ? (
                    <div className="py-4 text-center">No pending reviews</div>
                ) : (
                    pendingReviews.map(review => (
                        <ReviewCard
                            key={review.id}
                            id={review.id}
                            bookingId={review.bookingId}
                            rating={review.rating}
                            text={review.ulasan}
                            carInfo={review.booking.mobil}
                            isEditable={true}
                            onSubmit={async (rating, text) => {
                                await handleSubmitReview(review.bookingId, rating, text);
                            }}
                        />
                    ))
                )}
            </TabsContent>

            <TabsContent value="completed" className="mt-4 space-y-4">
                {completedReviews.length === 0 ? (
                    <div className="py-4 text-center">No completed reviews</div>
                ) : (
                    completedReviews.map(review => (
                        <ReviewCard
                            key={review.id}
                            id={review.id}
                            bookingId={review.bookingId}
                            rating={review.rating}
                            text={review.ulasan}
                            carInfo={review.booking.mobil}
                        />
                    ))
                )}
            </TabsContent>
        </Tabs>
    );
}
