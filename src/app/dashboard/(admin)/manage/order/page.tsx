import { StatusBooking } from "@prisma/client";
import prisma from "@/lib/prisma";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BookingTab from "./_components/BookingTab";

export default async function ManageOrderPage() {
    const booking = await prisma.booking.findMany({
        include: {
            mobil: true,
            kabukota: true
        }
    });

    if (
        booking.filter(
            order => order.status === StatusBooking.OnGoing && order.endDate < new Date()
        ).length
    ) {
        await prisma.booking.updateMany({
            where: {
                status: StatusBooking.OnGoing,
                endDate: {
                    lte: new Date()
                }
            },
            data: {
                status: StatusBooking.Finished
            }
        });
    }

    const onGoingData = booking.filter(
        order => order.endDate > new Date() && order.status === StatusBooking.OnGoing
    );
    const canceledData = booking.filter(order => order.status === StatusBooking.Canceled);
    const finishedData = booking.filter(order => order.status === StatusBooking.Finished);

    const BookingData = [
        {
            tab: "ongoing",
            booking: onGoingData
        },
        {
            tab: "finished",
            booking: finishedData
        },
        {
            tab: "canceled",
            booking: canceledData
        }
    ];

    return (
        <Tabs defaultValue="ongoing" className="col-span-3 flex flex-col">
            <TabsList className="sticky top-[92px] z-10 grid grid-cols-3 rounded-xl shadow [&_button]:rounded-xl">
                <TabsTrigger value="ongoing">Sedang Berlangsung</TabsTrigger>
                <TabsTrigger value="finished">Selesai</TabsTrigger>
                <TabsTrigger value="canceled">Dibatalkan</TabsTrigger>
            </TabsList>
            {BookingData.map((data, index) => (
                <BookingTab key={index} tab={data.tab} booking={data.booking} />
            ))}
        </Tabs>
    );
}
