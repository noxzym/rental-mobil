import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get("status");
    const id = searchParams.get("id");
    const today = new Date();

    try {
        // Handle single booking fetch
        if (id) {
            const booking = await prisma.booking.findUnique({
                where: { id },
                include: {
                    user: {
                        include: {
                            kelurahan: {
                                include: {
                                    kecamatan: {
                                        include: {
                                            kabukota: {
                                                include: {
                                                    provinsi: true
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    mobil: true,
                    kabukota: true
                }
            });

            if (!booking) {
                return NextResponse.json({ error: "Booking not found" }, { status: 404 });
            }

            return NextResponse.json({
                id: booking.id,
                user: {
                    name: booking.user.nama_panjang,
                    email: booking.user.email,
                    phone: booking.user.no_telepon,
                    address: booking.user.alamat,
                    jl_no_rt_rw: booking.user.jl_no_rt_rw || null,
                    kelurahan: booking.user.kelurahan?.nama,
                    kecamatan: booking.user.kelurahan?.kecamatan?.nama,
                    kabukota: booking.user.kelurahan?.kecamatan?.kabukota?.nama,
                    provinsi: booking.user.kelurahan?.kecamatan?.kabukota?.provinsi?.nama
                },
                car: {
                    id: booking.mobil.id,
                    brand: booking.mobil.merek,
                    model: booking.mobil.model,
                    color: booking.mobil.warna,
                    plate: booking.mobil.no_plat,
                    harga: booking.mobil.harga
                },
                driver: booking.driver,
                schedule: {
                    startDate: booking.start_date.toISOString().split("T")[0],
                    endDate: booking.end_date.toISOString().split("T")[0],
                    pickupTime: booking.pickup_time.toISOString().split("T")[1].slice(0, 5)
                },
                destination: booking.kabukota?.nama,
                status: booking.canceled
                    ? "Canceled"
                    : booking.end_date < today
                      ? "Selesai"
                      : booking.start_date <= today && booking.end_date >= today
                        ? "Sedang Berjalan"
                        : "Akan Datang"
            });
        }

        // Handle booking list fetch (existing code)
        let bookings;

        if (status === "completed") {
            bookings = await prisma.booking.findMany({
                where: {
                    end_date: { lt: today },
                    canceled: false
                },
                include: {
                    user: true
                }
            });
        } else if (status === "inProgress") {
            bookings = await prisma.booking.findMany({
                where: {
                    start_date: { lte: today },
                    end_date: { gte: today },
                    canceled: false
                },
                include: {
                    user: true
                }
            });
        } else if (status === "incoming") {
            bookings = await prisma.booking.findMany({
                where: {
                    start_date: { gt: today },
                    canceled: false
                },
                include: {
                    user: true
                }
            });
        } else if (status === "canceled") {
            bookings = await prisma.booking.findMany({
                where: {
                    canceled: true
                },
                include: {
                    user: true
                }
            });
        } else {
            return NextResponse.json({ error: "Invalid status parameter" }, { status: 400 });
        }

        const response = bookings.map(booking => ({
            id: booking.id,
            userName: booking.user.nama_panjang,
            userId: booking.user.id,
            startDate: booking.start_date.toISOString().split("T")[0],
            endDate: booking.end_date.toISOString().split("T")[0],
            status:
                status === "completed"
                    ? "Selesai"
                    : status === "inProgress"
                      ? "Sedang Berjalan"
                      : status === "incoming"
                        ? "Akan Datang"
                        : "Canceled"
        }));

        return NextResponse.json(response);
    } catch (error) {
        console.error("Error fetching bookings:", error);
        return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
    }
}
