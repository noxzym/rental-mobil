import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import OrderDetail from './OrderDetail';

interface Order {
  id: string;
  userName: string;
  userId: string;
  startDate: string;
  endDate: string;
  status: string;
}

export default function OrderManagement() {
  const [activeTab, setActiveTab] = useState<string>('completed');
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`/api/booking?status=${activeTab}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch orders');
        }
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [activeTab]);

  return (
    <div className="flex h-[calc(100vh-theme(spacing.16))]">
      <div className={`flex-1 transition-all duration-300 ${selectedOrderId ? 'w-1/2' : 'w-full'}`}>
        <Tabs defaultValue="completed" onValueChange={(value) => setActiveTab(value)}>
          <TabsList className="mb-4 flex justify-around">
            <TabsTrigger value="completed">Selesai</TabsTrigger>
            <TabsTrigger value="inProgress">Sedang Berjalan</TabsTrigger>
            <TabsTrigger value="incoming">Akan Datang</TabsTrigger>
            <TabsTrigger value="canceled">Canceled</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="space-y-4 p-4">
          {orders.map((order) => (
            <Card 
              key={order.id} 
              className="flex items-center justify-between p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setSelectedOrderId(order.id)}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-500 rounded-full"></div>
                <div>
                  <h3 className="font-medium">{order.userName}</h3>
                  <p className="text-sm text-gray-500">{order.id}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">{`${order.startDate} - ${order.endDate}`}</p>
                <Button variant="outline" size="sm">
                  {order.status}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {selectedOrderId && (
        <div className="w-1/2 border-l">
          <OrderDetail 
            orderId={selectedOrderId}
            onClose={() => setSelectedOrderId(null)}
          />
        </div>
      )}
    </div>
  );
}