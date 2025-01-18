"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { AiOutlineCar } from "react-icons/ai";
import { BiCalendar, BiMap, BiTime } from "react-icons/bi";
import { PiPalette } from "react-icons/pi";
import { PiSeatbelt } from "react-icons/pi";
import { RiSteeringLine } from "react-icons/ri";
import { RxCardStackMinus } from "react-icons/rx";
import { formatCurrency } from "@/lib/utils";
import { useQueryStore } from "@/hooks/floppy-disk/use-queryStore";
import { selectedCarStore, useSelectedCarStore } from "@/hooks/floppy-disk/use-selectedCarStore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface Location {
    id: string;
    nama: string;
}

export default function Aside() {
    const session = useSession();
    const [storeData, setStoreData] = useState(useSelectedCarStore());
    const [queryData, setQueryData] = useState(useQueryStore());
    const [loading, setLoading] = useState(false);
    const [driverOption, setDriverOption] = useState("sendiri");
    const [locations, setLocations] = useState<Location[]>([]);
    const router = useRouter();

    useEffect(() => {
        const unsubscribeSelectedCar = selectedCarStore.subscribe(newState => {
            setStoreData(newState);
        });

        const unsubscribeQuery = useQueryStore.subscribe(newState => {
            setQueryData(newState);
        });

        // Fetch locations
        const fetchLocations = async () => {
            try {
                const response = await fetch("/api/locations");
                const data = await response.json();
                setLocations(data.kabukota);
            } catch (error) {
                console.error("Error fetching locations:", error);
            }
        };

        fetchLocations();

        return () => {
            unsubscribeSelectedCar();
            unsubscribeQuery();
        };
    }, []);

    if (!storeData.selectedCar) {
        return (
            <div className="h-fit rounded-xl bg-white p-6 shadow-md">
                <h2 className="text-center text-xl font-bold">Detail Pesanan</h2>
                <p className="mt-4 text-center text-gray-500">
                    Silakan pilih mobil dan isi detail pemesanan
                </p>
            </div>
        );
    }

    const handleBook = async () => {
        if (
            !storeData.selectedCar ||
            !queryData.date ||
            !queryData.duration ||
            !queryData.time ||
            !queryData.location
        )
            return;

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
                    router.push("/dashboard/profile");
                    return;
                }
                throw new Error("Failed to check eligibility");
            }

            let time = queryData.time;
            time.length == 1
                ? (time = `1970-01-01T0${time}:00:00.000Z`)
                : (time = `1970-01-01T${time}:00:00.000Z`);

            const booking = {
                mobil_id: storeData.selectedCar.id,
                start_date: (Number(queryData.date)+86400000).toString(),
                end_date: (
                    (Number(queryData.date)+86400000) +
                    (Number(queryData.duration) - 1) * 86400000
                ).toString(),
                driver:
                    driverOption === "dengan"
                        ? `Driver ${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`
                        : null,
                pickup_time: time,
                kabukota_tujuan: queryData.location,
                email: session.data?.user.email
            };

            console.log(booking);

            const bookingResponse = await fetch("/api/booking", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(booking)
            });

            if (bookingResponse.ok) {
                router.push("/dashboard/orders");
            } else {
                throw new Error("Booking failed");
            }
        } catch (error) {
            console.error("Booking failed:", error);
        } finally {
            setLoading(false);
        }
    };

    const totalPrice = storeData.selectedCar.harga * Number(queryData.duration);
    const locationName =
        locations.find(loc => loc.id === queryData.location)?.nama || queryData.location;

    return (
        <div className="h-fit rounded-xl bg-white p-6 shadow-md sticky top-[92px]">
            <h2 className="border-b pb-4 text-xl font-bold">Detail Pesanan</h2>

            <div className="mt-4 space-y-6">
                {/* Car Image and Details */}
                <div className="space-y-4">
                    <div className="aspect-video h-auto w-full !rounded-lg">
                        <Avatar className="aspect-video h-auto w-full !rounded-lg">
                            <AvatarImage
                                src={storeData.selectedCar.gambar}
                                alt={`${storeData.selectedCar.merek} ${storeData.selectedCar.model}`}
                                className="object-cover"
                            />
                            <AvatarFallback>CAR</AvatarFallback>
                        </Avatar>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold">
                            {storeData.selectedCar.merek} {storeData.selectedCar.model}
                        </h3>
                        <p className="text-sm text-gray-500">{storeData.selectedCar.tahun}</p>
                    </div>

                    {/* Car Specifications */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="flex items-center gap-2 text-sm">
                            <RxCardStackMinus className="h-4 w-4 text-gray-500" />
                            <span>{storeData.selectedCar.plat}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <PiPalette className="h-4 w-4 text-gray-500" />
                            <span>{storeData.selectedCar.warna}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <RiSteeringLine className="h-4 w-4 text-gray-500" />
                            <span>{storeData.selectedCar.transmisi.toLowerCase()}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <PiSeatbelt className="h-4 w-4 text-gray-500" />
                            <span>{storeData.selectedCar.bangku} Kursi</span>
                        </div>
                    </div>
                </div>

                {/* Driver Options */}
                <div>
                    <p className="mb-3 font-medium">Driver Option</p>
                    <div className="grid grid-cols-2 gap-2">
                        <button
                            onClick={() => setDriverOption("dengan")}
                            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                                driverOption === "dengan"
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                        >
                            Dengan Driver
                        </button>
                        <button
                            onClick={() => setDriverOption("sendiri")}
                            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                                driverOption === "sendiri"
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                        >
                            Menyetir Sendiri
                        </button>
                    </div>
                </div>

                <Separator />

                {/* Booking Details */}
                <div className="space-y-4">
                    {queryData.date && (
                        <div className="flex items-center gap-3">
                            <BiCalendar className="h-5 w-5 text-gray-500" />
                            <span>{format(new Date(Number(queryData.date)), "dd MMMM yyyy")}</span>
                        </div>
                    )}
                    {queryData.time && (
                        <div className="flex items-center gap-3">
                            <BiTime className="h-5 w-5 text-gray-500" />
                            <span>{queryData.time}:00</span>
                        </div>
                    )}
                    {queryData.location && (
                        <div className="flex items-center gap-3">
                            <BiMap className="h-5 w-5 text-gray-500" />
                            <span>{locationName}</span>
                        </div>
                    )}
                    {queryData.duration && (
                        <div className="flex items-center gap-3">
                            <AiOutlineCar className="h-5 w-5 text-gray-500" />
                            <span>{queryData.duration} Hari</span>
                        </div>
                    )}
                </div>

                <Separator />

                {/* Pricing */}
                <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                        <span>Harga per hari:</span>
                        <span>{formatCurrency(storeData.selectedCar.harga)}</span>
                    </div>
                    <div className="flex justify-between text-lg font-semibold">
                        <span>Total:</span>
                        <span>{formatCurrency(totalPrice)}</span>
                    </div>
                </div>

                {/* Book Now Button */}
                {queryData.date && queryData.duration && queryData.time && queryData.location && (
                    <Button
                        className="w-full bg-blue-500 py-6 text-lg text-white hover:bg-blue-600"
                        onClick={handleBook}
                        disabled={loading}
                    >
                        {loading ? "Processing..." : "Book Now"}
                    </Button>
                )}
            </div>
        </div>
    );
}
