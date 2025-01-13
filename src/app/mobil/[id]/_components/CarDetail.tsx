"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Prisma } from "@prisma/client";
import { Card } from "@/components/ui/card";

type Mobil = Prisma.mobilGetPayload<{}>;

export default function CarDetails({
    mobilId,
    date,
    duration,
    time,
    location
}: {
    mobilId: string;
    date: string;
    duration: string;
    time: string;
    location: string;
}) {
    const [car, setCar] = useState<Mobil | null>(null);
    const [loading, setLoading] = useState(false);
    const [driverOption, setDriverOption] = useState<"dengan" | "sendiri">("dengan");
    const router = useRouter();

    useEffect(() => {
        const fetchCar = async () => {
            const response = await fetch(`/api/cars/${mobilId}`);
            if (!response.ok) {
                router.push("/search");
                return;
            }
            const data = await response.json();
            setCar(data);
        };
        fetchCar();
    }, [mobilId, router]);

    const handleBook = async () => {
        setLoading(true);
        try {
            const checkResponse = await fetch("/api/booking/check", {
                method: "POST"
            });

            if (!checkResponse.ok) {
                if (checkResponse.status === 401) {
                    router.push("/login");
                    return;
                }
                if (checkResponse.status === 403) {
                    router.push("/customer-dashboard");
                    return;
                }
                throw new Error("Failed to check eligibility");
            }

            const booking = {
                mobil_id: mobilId,
                start_date: date,
                end_date: (Number(date) + (Number(duration) - 1) * 86400000).toString(),
                driver:
                    driverOption === "dengan"
                        ? `Driver ${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`
                        : null,
                pickup_time: `${time.padStart(2, "0")}:00:00`,
                kabukota_tujuan: location
            };

            const bookingResponse = await fetch("/api/booking", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(booking)
            });

            if (bookingResponse.ok) {
                router.push("/customer-dashboard");
            } else {
                throw new Error("Booking failed");
            }
        } catch (error) {
            console.error("Booking failed:", error);
        } finally {
            setLoading(false);
        }
    };

    if (!car) return <div>Loading...</div>;

    const totalPrice = car.harga * (Number(duration) - 1);

    return (
        <Card className="p-6">
            <div className="grid grid-cols-2 gap-6">
                <div>
                    <div className="relative aspect-video w-full rounded-lg">
                        {car.gambar ? (
                            <Image
                                src={car.gambar}
                                alt={`${car.merek} ${car.model}`}
                                fill
                                className="rounded-lg object-cover"
                            />
                        ) : (
                            <div className="h-full w-full rounded-lg bg-gray-200" />
                        )}
                    </div>
                    <div className="mt-4">
                        <p className="text-sm text-gray-500">Plat Nomor: {car.plat}</p>
                        <p className="text-sm text-gray-500">Kapasitas: {car.bangku} orang</p>
                    </div>
                </div>
                <div className="flex flex-col justify-between">
                    <div>
                        <h2 className="mb-2 text-2xl font-bold">
                            {car.merek} {car.model}
                        </h2>
                        <p className="mb-4 text-gray-600">
                            {car.tahun} • {car.warna}
                        </p>

                        <div className="mb-6 space-y-4">
                            <div className="flex justify-between">
                                <p className="font-semibold">Base Price:</p>
                                <p>Rp {car.harga.toLocaleString()},00</p>
                            </div>
                            <div className="flex justify-between">
                                <p className="font-semibold">Duration:</p>
                                <p>{duration} day(s)</p>
                            </div>
                            <div className="flex justify-between">
                                <p className="font-semibold">Total Price:</p>
                                <p>Rp {totalPrice.toLocaleString()},00</p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <p className="font-semibold">Driver Option:</p>
                            <div className="flex gap-4">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="driver"
                                        checked={driverOption === "dengan"}
                                        onChange={() => setDriverOption("dengan")}
                                    />
                                    Dengan Driver
                                </label>
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="driver"
                                        checked={driverOption === "sendiri"}
                                        onChange={() => setDriverOption("sendiri")}
                                    />
                                    Menyetir Sendiri
                                </label>
                            </div>
                        </div>
                    </div>

                    <button
                        className="w-full rounded-lg bg-blue-500 py-3 text-white hover:bg-blue-600 disabled:opacity-50"
                        onClick={handleBook}
                        disabled={loading}
                    >
                        {loading ? "Processing..." : "Book"}
                    </button>
                </div>
            </div>
        </Card>
    );
}
