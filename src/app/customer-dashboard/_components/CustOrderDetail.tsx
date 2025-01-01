'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface CustOrderDetailProps {
  orderId: string;
  onClose: () => void;
}

interface BookingDetail {
  mobil: {
    id: string;
    merek: string;
    model: string;
    warna: string;
    no_plat: string;
    harga: number;
  };
  driver: string | null;
  start_date: string;
  end_date: string;
  pickup_time: string;
  kabukota: {
    nama: string;
  };
  status: string;
  canceled: boolean;
}

const CustOrderDetail = ({ orderId, onClose }: CustOrderDetailProps) => {
  const [bookingData, setBookingData] = useState<BookingDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [price, setPrice] = useState({
    basePrice: 0,
    duration: 0,
    totalPrice: 0
  });

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await fetch(`/api/cust-order?id=${orderId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch booking details');
        }
        const data = await response.json();
        
        // Calculate duration and price
        const startDate = new Date(data.start_date);
        const endDate = new Date(data.end_date);
        const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
        const diffDays = Math.ceil((diffTime / (1000 * 60 * 60 * 24)) + 1);
        const duration = diffDays === 0 ? 1 : diffDays;
        
        const basePrice = data.mobil.harga;
        const totalPrice = basePrice * duration;

        setPrice({
          basePrice,
          duration,
          totalPrice
        });

        // Calculate status
        const today = new Date();
        let status = data.canceled 
          ? 'canceled'
          : endDate < today
          ? 'completed'
          : startDate <= today && endDate >= today
          ? 'inProgress'
          : 'incoming';

        setBookingData({
          ...data,
          status
        });
      } catch (error) {
        console.error('Error fetching booking details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [orderId]);

  const handleCancel = async () => {
    try {
      const response = await fetch(`/api/cust-order/cancel`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bookingId: orderId }),
      });

      if (!response.ok) {
        throw new Error('Failed to cancel booking');
      }

      // Update local state
      if (bookingData) {
        setBookingData({
          ...bookingData,
          canceled: true,
          status: 'canceled'
        });
      }
    } catch (error) {
      console.error('Error canceling booking:', error);
    }
    setShowCancelDialog(false);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(amount);
  };

  if (loading) {
    return <div className="h-full flex items-center justify-center">Loading...</div>;
  }

  if (!bookingData) {
    return <div className="h-full flex items-center justify-center">Booking not found</div>;
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed': return 'Selesai';
      case 'inProgress': return 'Sedang Berjalan';
      case 'incoming': return 'Akan Datang';
      case 'canceled': return 'Dibatalkan';
      default: return status;
    }
  };

  return (
    <div className="h-full p-6 bg-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Booking_{orderId}</h2>
        <Button variant="ghost" onClick={onClose}>
          ← Back
        </Button>
      </div>

      <div className="space-y-6">
        {/* Car Info Section */}
        <Card className="p-4 space-y-4">
          <Input 
            className="bg-gray-50" 
            value={bookingData.mobil.id}
            placeholder="MobilId" 
            disabled 
          />
          <Input 
            className="bg-gray-50" 
            value={bookingData.mobil.merek}
            placeholder="Merek Mobil" 
            disabled 
          />
          <Input 
            className="bg-gray-50" 
            value={bookingData.mobil.model}
            placeholder="Type Mobil" 
            disabled 
          />
          <Input 
            className="bg-gray-50" 
            value={bookingData.mobil.warna}
            placeholder="Warna Mobil" 
            disabled 
          />
          <Input 
            className="bg-gray-50" 
            value={bookingData.mobil.no_plat}
            placeholder="Nomor Plat" 
            disabled 
          />
        </Card>

        {/* Schedule Info Section */}
        <Card className="p-4 space-y-4">
          <Input 
            className="bg-gray-50" 
            value={new Date(bookingData.start_date).toLocaleDateString()}
            placeholder="Tanggal Mulai" 
            disabled 
          />
          <Input 
            className="bg-gray-50" 
            value={new Date(bookingData.end_date).toLocaleDateString()}
            placeholder="Tanggal Selesai" 
            disabled 
          />
          <Input
            className="bg-gray-50"
            value={bookingData.pickup_time}
            placeholder="Jam Penjemputan"
            disabled
          />
          <Input 
            className="bg-gray-50" 
            value={bookingData.driver || 'Menyetir Sendiri'}
            placeholder="Driver" 
            disabled 
          />
          <Input
            className="bg-gray-50"
            value={bookingData.kabukota.nama}
            placeholder="Kota Tujuan"
            disabled
          />
        </Card>

        {/* Price Section */}
        <Card className="p-4 space-y-4">
          <h3 className="font-semibold text-lg mb-2">Price Details</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Base Price:</span>
              <span>{formatCurrency(price.basePrice)}</span>
            </div>
            <div className="flex justify-between">
              <span>Duration:</span>
              <span>{price.duration} day(s)</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Total Price:</span>
              <span>{formatCurrency(price.totalPrice)}</span>
            </div>
          </div>
        </Card>

        <div className="space-y-2">
          <Button className="w-full" variant={
            bookingData.status === 'completed' ? 'default' :
            bookingData.status === 'inProgress' ? 'secondary' :
            bookingData.status === 'incoming' ? 'outline' :
            'destructive'
          }>
            {getStatusLabel(bookingData.status)}
          </Button>

          {bookingData.status === 'incoming' && !bookingData.canceled && (
            <Button 
              className="w-full" 
              variant="destructive"
              onClick={() => setShowCancelDialog(true)}
            >
              Cancel Booking
            </Button>
          )}
        </div>
      </div>

      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to cancel this booking?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The booking will be canceled permanently.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>No, keep booking</AlertDialogCancel>
            <AlertDialogAction onClick={handleCancel}>Yes, cancel booking</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CustOrderDetail;