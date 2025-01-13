"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

interface ReviewCardProps {
    id: string;
    bookingId: string;
    rating: number | null;
    text: string | null;
    carInfo: {
        merek: string;
        model: string;
    };
    isEditable?: boolean;
    onSubmit?: (rating: number, text: string) => Promise<void>;
}

export default function ReviewCard({
    id,
    bookingId,
    rating,
    text,
    carInfo,
    isEditable = false,
    onSubmit
}: ReviewCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [editRating, setEditRating] = useState<number>(0);
    const [editText, setEditText] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        if (!onSubmit || editRating === 0 || !editText.trim()) return;

        setIsSubmitting(true);
        try {
            await onSubmit(editRating, editText);
            setIsExpanded(false);
        } catch (error) {
            console.error("Failed to submit review:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderStars = (count: number, isInteractive = false) => (
        <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, idx) => (
                <Star
                    key={idx}
                    size={16}
                    className={cn(
                        idx < count ? "text-yellow-400" : "text-gray-300",
                        isInteractive && "cursor-pointer transition-transform hover:scale-110"
                    )}
                    onClick={isInteractive ? () => setEditRating(idx + 1) : undefined}
                    fill={idx < count ? "currentColor" : "none"}
                />
            ))}
        </div>
    );

    return (
        <Card
            className={cn(
                "p-4",
                isEditable && "cursor-pointer transition-shadow hover:shadow-md",
                isExpanded && "space-y-4"
            )}
            onClick={isEditable && !isExpanded ? () => setIsExpanded(true) : undefined}
        >
            <div className="flex items-start gap-4">
                <div className="flex-1">
                    <h3 className="font-medium">
                        {carInfo.merek} {carInfo.model}
                    </h3>
                    <p className="text-sm text-gray-500">Booking ID: {bookingId}</p>
                    {!isEditable && text && <p className="mt-2">{text}</p>}
                </div>
                {!isEditable && rating && renderStars(rating)}
            </div>

            {isEditable && isExpanded && (
                <div className="space-y-4">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium">Rating:</label>
                        {renderStars(editRating, true)}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium">Your Review:</label>
                        <Textarea
                            value={editText}
                            onChange={e => setEditText(e.target.value)}
                            placeholder="Write your review here..."
                            className="min-h-[100px]"
                        />
                    </div>

                    <div className="flex justify-end gap-2">
                        <Button
                            variant="outline"
                            onClick={() => setIsExpanded(false)}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            disabled={isSubmitting || editRating === 0 || !editText.trim()}
                        >
                            Submit Review
                        </Button>
                    </div>
                </div>
            )}
        </Card>
    );
}
