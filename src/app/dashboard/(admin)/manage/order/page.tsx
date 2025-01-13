import { revalidatePath } from "next/cache";
import { StatusBooking, StatusMobil } from "@prisma/client";
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
            order => order.status === StatusBooking.ONGOING && order.endDate < new Date()
        ).length
    ) {
        await prisma.booking.updateMany({
            where: {
                status: StatusBooking.ONGOING,
                endDate: {
                    lte: new Date()
                }
            },
            data: {
                status: StatusBooking.FINISHED
            }
        });
    }

    const onGoingData = booking.filter(
        order => order.endDate > new Date() && order.status === StatusBooking.ONGOING
    );
    const canceledData = booking.filter(order => order.status === StatusBooking.CANCELED);
    const finishedData = booking.filter(order => order.status === StatusBooking.FINISHED);

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

    async function handleCancelBooking(id: string) {
        "use server";

        await prisma.booking.update({
            where: {
                id
            },
            data: {
                status: StatusBooking.CANCELED,
                mobil: {
                    update: {
                        status: StatusMobil.READY
                    }
                }
            }
        });

        revalidatePath("/dashboard/orders");
    }

    return (
        <Tabs defaultValue="ongoing" className="col-span-3 flex flex-col">
            <TabsList className="sticky top-[92px] z-10 grid grid-cols-3 rounded-xl shadow [&_button]:rounded-xl">
                <TabsTrigger value="ongoing">Sedang Berlangsung</TabsTrigger>
                <TabsTrigger value="finished">Selesai</TabsTrigger>
                <TabsTrigger value="canceled">Dibatalkan</TabsTrigger>
            </TabsList>
            {BookingData.map((data, index) => (
                <BookingTab
                    key={index}
                    tab={data.tab}
                    booking={data.booking}
                    onCancel={handleCancelBooking}
                />
            ))}
        </Tabs>
    );
}
