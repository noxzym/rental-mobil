import { type ClassValue, clsx } from "clsx";
import { format } from "date-fns";
import { id } from "date-fns/locale/id";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getBookingDates(timestamp: string, duration: number) {
    const startDate = new Date(timestamp);
    const endDate = new Date(startDate.setDate(startDate.getDate() + duration));

    return {
        startDate,
        endDate
    };
}

export function getBookingPrices(price: number, duration: number) {
    return formatCurrency(price * duration);
}

export function getBookingDuration(startDate: Date, endDate: Date) {
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
}

export function formatCurrency(amount: number) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        currencyDisplay: "code"
    }).format(amount);
}

export function formatDate(date: Date) {
    return format(date, "dd MMMM yyyy", {
        locale: id
    });
}
