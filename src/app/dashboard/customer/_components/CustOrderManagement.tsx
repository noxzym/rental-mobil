"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CustOrderDetail from "./CustOrderDetail";

interface Order {
    id: string;
    start_date: string;
    end_date: string;
    status: string;
    mobil: {
        merek: string;
        model: string;
        no_plat: string;
    };
}

export default function CustOrderManagement() {
    const { data: session } = useSession();
    const [activeTab, setActiveTab] = useState<string>("completed");
    const [orders, setOrders] = useState<Order[]>([]);
    const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

    useEffect(() => {
        const fetchOrders = async () => {
            if (!session?.user?.email) return;

            try {
                const response = await fetch(
                    `/api/cust-order?status=${activeTab}&email=${session.user.email}`
                );
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || "Failed to fetch orders");
                }
                const data = await response.json();
                setOrders(data);
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };

        fetchOrders();
    }, [activeTab, session?.user?.email]);

    return (
        <div className="flex h-[calc(100vh-theme(spacing.16))]">
            <div
                className={`flex-1 transition-all duration-300 ${selectedOrderId ? "w-1/2" : "w-full"}`}
            >
                <Tabs defaultValue="completed" onValueChange={value => setActiveTab(value)}>
                    <TabsList className="mb-4 flex justify-around">
                        <TabsTrigger value="completed">Selesai</TabsTrigger>
                        <TabsTrigger value="inProgress">Sedang Berjalan</TabsTrigger>
                        <TabsTrigger value="incoming">Akan Datang</TabsTrigger>
                        <TabsTrigger value="canceled">Canceled</TabsTrigger>
                    </TabsList>
                </Tabs>

                <div className="space-y-4 p-4">
                    {orders.map(order => (
                        <Card
                            key={order.id}
                            className="flex cursor-pointer items-center justify-between p-4 transition-shadow hover:shadow-md"
                            onClick={() => setSelectedOrderId(order.id)}
                        >
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                                    {order.mobil.merek[0]}
                                </div>
                                <div>
                                    <h3 className="font-medium">{`${order.mobil.merek} ${order.mobil.model}`}</h3>
                                    <p className="text-sm text-gray-500">{order.mobil.no_plat}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-gray-500">
                                    {new Date(order.start_date).toLocaleDateString()} -{" "}
                                    {new Date(order.end_date).toLocaleDateString()}
                                </p>
                                {/* <Button 
                  variant={
                    order.status === 'completed' ? 'default' :
                    order.status === 'inProgress' ? 'secondary' :
                    order.status === 'incoming' ? 'outline' :
                    'destructive'
                  } 
                  size="sm"
                >
                  {order.status}
                </Button> */}
                            </div>
                        </Card>
                    ))}
                </div>
            </div>

            {selectedOrderId && (
                <div className="w-1/2 border-l">
                    <CustOrderDetail
                        orderId={selectedOrderId}
                        onClose={() => setSelectedOrderId(null)}
                    />
                </div>
            )}
        </div>
    );
}
