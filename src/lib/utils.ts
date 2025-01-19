import { type ClassValue, clsx } from "clsx";
import { format } from "date-fns";
import { id } from "date-fns/locale/id";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getBookingDates(timestamp: number, duration: number) {
    const startDate = new Date(timestamp);
    startDate.setHours(0, 0, 1);

    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + duration - 1);
    endDate.setHours(23, 59, 59);

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
    return format(date, "dd MMMM yyyy kk:mm:ss", {
        locale: id
    });
}
