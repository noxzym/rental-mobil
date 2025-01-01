import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getBookingDates(timestamp: number, duration: number) {
    const startDate = new Date(timestamp);
    const intervalOfRenting = (duration * 86400000) + 86400000;
    const endDate = new Date(timestamp + intervalOfRenting);
    
    return {
        startDate,
        endDate
    };
}