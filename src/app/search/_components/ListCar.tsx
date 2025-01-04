"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

export default function ListCar() {
    const [cars, setCars] = useState<Car[]>([]);
    const searchParams = useSearchParams();
    const sort = searchParams.get("sort") || "harga";
    const order = searchParams.get("order") || "asc";

    useEffect(() => {
        const fetchCars = async () => {
            const queryString = searchParams.toString();
            const response = await fetch(`/api/cars?${queryString}`);
            const data = await response.json();
            if (Array.isArray(data)) {
                setCars(data);
            }
        };

        fetchCars();
    }, [searchParams]);

    return (
        <section className="col-span-3 grid w-full gap-3">
            {cars.map(car => (
                <div
                    key={car.id}
                    className="flex w-full items-center justify-between rounded-xl bg-background px-4 py-5 shadow"
                >
                    <div className="flex">
                        <span className="relative aspect-video h-auto w-40 rounded-lg">
                            {car.image ? (
                                <Image src={car.image} alt={`${car.merek} ${car.model}`} fill />
                            ) : (
                                <div className="h-full w-full bg-gray-200" />
                            )}
                        </span>
                        <div className="ml-5 flex flex-col text-sm">
                            <p className="font-bold">
                                {car.merek} {car.model}
                            </p>
                            <p>{car.tahun}</p>
                            <p>{car.warna}</p>
                        </div>
                    </div>
                    <div className="flex self-end">
                        <div className="flex">
                            <p className="text-2xl font-bold">
                                IDR {car.harga.toLocaleString("id-ID")}
                            </p>
                            <p className="self-end text-sm"> / hari</p>
                        </div>
                    </div>
                </div>
            ))}
        </section>
    );
}
