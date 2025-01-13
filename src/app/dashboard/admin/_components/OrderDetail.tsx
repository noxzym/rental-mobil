import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface OrderDetailProps {
    orderId: string;
    onClose: () => void;
}

interface BookingDetail {
    user: {
        name: string;
        email: string;
        phone: string;
        address: string;
        jl_no_rt_rw?: string;
        kelurahan?: string;
        kecamatan?: string;
        kabukota?: string;
        provinsi?: string;
    };
    car: {
        id: string;
        brand: string;
        model: string;
        color: string;
        plate: string;
        harga: number;
    };
    driver: string | null;
    schedule: {
        startDate: string;
        endDate: string;
        pickupTime: string;
    };
    destination: string;
    status: string;
    price: {
        basePrice: number;
        duration: number;
        totalPrice: number;
    };
}

const OrderDetail = ({ orderId, onClose }: OrderDetailProps) => {
    const [bookingData, setBookingData] = useState<BookingDetail | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookingDetails = async () => {
            try {
                const response = await fetch(`/api/booking?id=${orderId}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch booking details");
                }
                const data = await response.json();

                // Calculate duration and price
                const startDate = new Date(data.schedule.startDate);
                const endDate = new Date(data.schedule.endDate);
                const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24) + 1);
                const duration = diffDays === 0 ? 1 : diffDays;

                const basePrice = data.car.harga;
                const totalPrice = basePrice * duration;

                // Add price calculations to the booking data
                const enhancedData = {
                    ...data,
                    price: {
                        basePrice,
                        duration,
                        totalPrice
                    }
                };

                setBookingData(enhancedData);
            } catch (error) {
                console.error("Error fetching booking details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBookingDetails();
    }, [orderId]);

    if (loading) {
        return <div className="flex h-full items-center justify-center">Loading...</div>;
    }

    if (!bookingData) {
        return <div className="flex h-full items-center justify-center">Booking not found</div>;
    }

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR"
        }).format(amount);
    };

    return (
        <div className="h-full bg-white p-6">
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold">Booking_{orderId}</h2>
                <Button variant="ghost" onClick={onClose}>
                    ← Back
                </Button>
            </div>

            <div className="space-y-6">
                {/* User Info Section */}
                <Card className="p-4">
                    <div className="mb-4 flex items-center gap-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                            {/* User avatar or placeholder */}
                        </div>
                        <div className="space-y-1">
                            <Input
                                className="bg-gray-50"
                                value={bookingData.user.name}
                                placeholder="Nama Pengguna"
                                disabled
                            />
                            <Input
                                className="bg-gray-50"
                                value={bookingData.user.email}
                                placeholder="Alamat@Email.com"
                                disabled
                            />
                        </div>
                    </div>
                    <Input
                        className="mt-2 bg-gray-50"
                        value={`${bookingData.user.phone || "N/A"}`}
                        placeholder="Nomor Telepon"
                        disabled
                    />
                    <Input
                        className="mt-2 bg-gray-50"
                        value={[
                            bookingData.user.jl_no_rt_rw,
                            bookingData.user.kelurahan && `Kel. ${bookingData.user.kelurahan}`,
                            bookingData.user.kecamatan && `Kec. ${bookingData.user.kecamatan}`,
                            bookingData.user.kabukota,
                            bookingData.user.provinsi
                        ]
                            .filter(Boolean)
                            .join(", ")}
                        placeholder="Alamat Lengkap"
                        disabled
                    />
                </Card>

                {/* Driver Info Section */}
                <Card className="space-y-4 p-4">
                    <Input
                        className="bg-gray-50"
                        value={bookingData.driver || "Menyetir Sendiri"}
                        placeholder="Nama Driver"
                        disabled
                    />
                    <Input
                        className="bg-gray-50"
                        value={bookingData.car.id}
                        placeholder="MobilId"
                        disabled
                    />
                    <Input
                        className="bg-gray-50"
                        value={bookingData.car.brand}
                        placeholder="Merek Mobil"
                        disabled
                    />
                    <Input
                        className="bg-gray-50"
                        value={bookingData.car.model}
                        placeholder="Type Mobil"
                        disabled
                    />
                    <Input
                        className="bg-gray-50"
                        value={bookingData.car.color}
                        placeholder="Warna Mobil"
                        disabled
                    />
                    <Input
                        className="bg-gray-50"
                        value={bookingData.car.plate}
                        placeholder="Nomor Plat"
                        disabled
                    />
                </Card>

                {/* Time Info Section */}
                <Card className="space-y-4 p-4">
                    <Input
                        className="bg-gray-50"
                        value={bookingData.schedule.startDate}
                        placeholder="Waktu Penjemputan"
                        disabled
                    />
                    <Input
                        className="bg-gray-50"
                        value={bookingData.schedule.endDate}
                        placeholder="Waktu Selesai"
                        disabled
                    />
                    <Input
                        className="bg-gray-50"
                        value={bookingData.schedule.pickupTime}
                        placeholder="Jam Penjemputan"
                        disabled
                    />
                    <Input
                        className="bg-gray-50"
                        value={bookingData.destination || "N/A"}
                        placeholder="Kota Tujuan"
                        disabled
                    />
                </Card>

                <Card className="space-y-4 p-4">
                    <h3 className="mb-2 text-lg font-semibold">Price Details</h3>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span>Base Price:</span>
                            <span>{formatCurrency(bookingData.price.basePrice)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Duration:</span>
                            <span>{bookingData.price.duration} day(s)</span>
                        </div>
                        <div className="flex justify-between font-semibold">
                            <span>Total Price:</span>
                            <span>{formatCurrency(bookingData.price.totalPrice)}</span>
                        </div>
                    </div>
                </Card>

                <Button
                    className="w-full"
                    variant={
                        bookingData.status === "Selesai"
                            ? "default"
                            : bookingData.status === "Sedang Berjalan"
                              ? "secondary"
                              : bookingData.status === "Akan Datang"
                                ? "outline"
                                : "destructive"
                    }
                >
                    {bookingData.status}
                </Button>
            </div>
        </div>
    );
};

export default OrderDetail;
