"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

export default function CarManagement() {
    const [activeTab, setActiveTab] = useState<string>("ready");
    const [cars, setCars] = useState<Car[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchCars = async () => {
        try {
            const queryParams = new URLSearchParams({
                queryType: "status",
                status: activeTab
            }).toString();

            const response = await fetch(`/api/cars?${queryParams}`);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to fetch cars");
            }

            const data = await response.json();
            setCars(data);
        } catch (error) {
            console.error("Error fetching cars:", error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to fetch cars. Please try again."
            });
        }
    };

    useEffect(() => {
        fetchCars();
    }, [activeTab]);

    const handleStatusUpdate = async (carId: string, newStatus: boolean) => {
        setLoading(true);
        try {
            const response = await fetch("/api/cars", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: carId,
                    status: newStatus
                })
            });

            if (!response.ok) {
                throw new Error("Failed to update car status");
            }

            // Refetch cars to update the list
            await fetchCars();

            toast({
                title: "Success",
                description: `Car status updated to ${newStatus ? "Ready" : "Maintenance"}`
            });
        } catch (error) {
            console.error("Error updating car status:", error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to update car status. Please try again."
            });
        } finally {
            setLoading(false);
        }
    };

    const getStatusText = (car: Car) => {
        if (activeTab === "ready") return "Available";
        if (activeTab === "checking") return "Under Maintenance";
    };

    const getButtonText = (car: Car) => {
        if (activeTab === "ready") return "Mark as Maintenance";
        if (activeTab === "checking") return "Mark as Ready";
        return "Currently Booked";
    };

    return (
        <div className="p-4">
            <Tabs defaultValue="ready" onValueChange={value => setActiveTab(value)}>
                <TabsList className="grid grid-cols-3">
                    <TabsTrigger value="ready">Ready Car</TabsTrigger>
                    <TabsTrigger value="checking">Checking Car</TabsTrigger>
                    <TabsTrigger value="ordered">In Ordered Car</TabsTrigger>
                </TabsList>

                <div className="space-y-4">
                    {cars.length === 0 ? (
                        <div className="py-8 text-center text-gray-500">
                            No cars found in this category
                        </div>
                    ) : (
                        cars.map(car => (
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
                                <div className="flex flex-col items-end gap-2">
                                    <span
                                        className={`text-sm ${
                                            activeTab === "ready"
                                                ? "text-green-600"
                                                : activeTab === "checking"
                                                  ? "text-yellow-600"
                                                  : "text-red-600"
                                        }`}
                                    >
                                        {getStatusText(car)}
                                    </span>
                                    <Button
                                        variant={activeTab === "ordered" ? "outline" : "default"}
                                        size="sm"
                                        disabled={loading || activeTab === "ordered"}
                                        onClick={() => {
                                            if (activeTab === "ready") {
                                                handleStatusUpdate(car.id, false);
                                            } else if (activeTab === "checking") {
                                                handleStatusUpdate(car.id, true);
                                            }
                                        }}
                                    >
                                        {getButtonText(car)}
                                    </Button>
                                </div>
                            </Card>
                        ))
                    )}
                </div>
            </Tabs>
        </div>
    );
}
