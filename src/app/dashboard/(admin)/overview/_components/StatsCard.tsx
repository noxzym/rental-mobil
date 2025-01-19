import { Prisma, StatusBooking } from "@prisma/client";
import { Card, CardContent } from "@/components/ui/card";

type props = {
    booking: Prisma.bookingGetPayload<{
        include: {
            mobil: true;
        };
    }>[];
};

export default function StatsCard({ booking }: props) {
    const completedBooking = booking.filter(
        order => order.status !== StatusBooking.Canceled && order.endDate < new Date()
    );

    const totalPemesanan = booking.filter(order => order.status !== StatusBooking.Canceled).length;
    const totalMobilTerpakaiSekarang = booking.filter(
        order => order.status === StatusBooking.OnGoing
    ).length;
    const totalPendapatan = completedBooking.reduce((total, order) => {
        const diffTime = Math.abs(order.endDate.getTime() - order.startDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const duration = diffDays === 0 ? 1 : diffDays + 1;
        const orderPrice = order.mobil?.harga ?? 0 * duration;

        return total + orderPrice;
    }, 0);

    const Statistic = [
        {
            title: "Total Pendapatan",
            value: totalPendapatan.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR"
            })
        },
        {
            title: "Total Pemesanan",
            value: totalPemesanan ? totalPemesanan : "Tidak ada"
        },
        {
            title: "Jumlah Mobil Berjalan",
            value: totalMobilTerpakaiSekarang ? totalMobilTerpakaiSekarang : "Tidak ada"
        }
    ];

    return (
        <section className="grid grid-cols-3 gap-3">
            {Statistic.map((stat, index) => (
                <Card key={index}>
                    <CardContent className="space-y-1 p-3">
                        <p className="font-medium text-gray-500">{stat.title}</p>
                        <p className="text-2xl font-bold">{stat.value}</p>
                    </CardContent>
                </Card>
            ))}
        </section>
    );
}
