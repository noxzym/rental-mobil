import { revalidatePath } from "next/cache";
import OrderDetail from "@/dashboard/_components/OrderDetail";
import { StatusBooking, StatusMobil } from "@prisma/client";
import prisma from "@/lib/prisma";
import { Card, CardTitle } from "@/components/ui/card";
import StatsCard from "./_components/StatsCard";

export default async function OverviewPage() {
    const booking = await prisma.booking.findMany({
        include: {
            mobil: true,
            kabukota: true
        }
    });

    const ongoingData = booking.filter(
        order => order.endDate > new Date() && order.status === StatusBooking.ONGOING
    );

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

        revalidatePath("/dashboard/overview");
    }

    return (
        <section className="col-span-3 flex flex-col gap-3">
            <StatsCard booking={booking} />
            <Card className="flex h-full flex-col gap-3 rounded-xl px-4 py-5">
                <CardTitle>Mobil Berjalan</CardTitle>
                {ongoingData.map((order, index) => (
                    <OrderDetail
                        key={index}
                        tab="ongoing"
                        booking={order}
                        onCancel={handleCancelBooking}
                    />
                ))}
            </Card>
        </section>
    );
}
