"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Car {
    id: string;
    warna: string;
    merek: string;
    model: string;
    tahun: string;
    no_plat: string;
    image: string | null;
    bangku: number;
    harga: number;
    status: boolean;
}

export default function OrderedCarsList() {
    const [activeTab, setActiveTab] = useState<string>("ready");
    const [cars, setCars] = useState<Car[]>([]);

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await fetch(`/api/cars?queryType=status&status=ordered`);
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || "Failed to fetch cars");
                }
                const data = await response.json();
                setCars(data);
            } catch (error) {
                console.error("Error fetching cars:", error);
            }
        };

        fetchCars();
    }, []);

    return (
        <Card>
            <CardContent className="p-4">
                <h2 className="mb-4 text-xl font-semibold">In Ordered Cars</h2>
                <div className="space-y-4">
                    {cars.map(car => (
                        <Card key={car.id} className="flex items-center justify-between p-4">
                            <div className="flex items-center gap-4">
                                <div className="relative h-16 w-24 overflow-hidden rounded bg-gray-200">
                                    {car.image ? (
                                        <Image
                                            src={car.image}
                                            alt={`${car.merek} ${car.model}`}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center text-gray-400">
                                            No Image
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <h3 className="font-medium">{`${car.merek} ${car.model}`}</h3>
                                    <p className="text-sm text-gray-500">{`${car.tahun} - ${car.no_plat}`}</p>
                                    <p className="text-sm text-gray-500">{`Seats: ${car.bangku} - Color: ${car.warna}`}</p>
                                    <p className="text-sm font-medium">{`Price: Rp${car.harga.toLocaleString()}`}</p>
                                </div>
                            </div>
                            <Button variant="destructive" size="sm">
                                In Ordered
                            </Button>
                        </Card>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
