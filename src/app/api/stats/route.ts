import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const today = new Date();

        // Fetch Total Pendapatan with duration calculation
        const completedBookings = await prisma.booking.findMany({
            where: {
                end_date: { lt: today },
                canceled: false
            },
            select: {
                start_date: true,
                end_date: true,
                mobil: {
                    select: {
                        harga: true
                    }
                }
            }
        });

        const totalPendapatan = completedBookings.reduce((total, booking) => {
            if (!booking.mobil?.harga) return total;

            // Calculate duration in days
            const startDate = new Date(booking.start_date);
            const endDate = new Date(booking.end_date);
            const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            const duration = diffDays === 0 ? 1 : diffDays + 1; // Add 1 to include both start and end days

            // Calculate total price for this booking
            const bookingPrice = booking.mobil.harga * duration;
            return total + bookingPrice;
        }, 0);

        // Fetch Total Pemesanan
        const totalPemesanan = await prisma.booking.count({
            where: {
                canceled: false
            }
        });

        // Fetch Mobil Terpakai Sekarang
        const todayStart = new Date(today);
        todayStart.setHours(0, 0, 0, 0);

        const todayEnd = new Date(today);
        todayEnd.setHours(23, 59, 59, 999);

        const mobilTerpakai = await prisma.booking.count({
            where: {
                start_date: { lte: todayEnd },
                end_date: { gte: todayStart },
                canceled: false
            }
        });

        return NextResponse.json({
            totalPendapatan,
            totalPemesanan,
            mobilTerpakai
        });
    } catch (error) {
        console.error("Error fetching stats:", error);
        return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
    }
}
