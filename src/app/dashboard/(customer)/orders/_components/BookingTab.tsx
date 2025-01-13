import OrderDetail from "@/dashboard/_components/OrderDetail";
import { Prisma } from "@prisma/client";
import { TabsContent } from "@/components/ui/tabs";

type props = {
    tab: string;
    booking: Prisma.bookingGetPayload<{ include: { mobil: true; kabukota: true } }>[];
    onCancel: (id: string) => void;
};

export default function BookingTab({ tab, booking, onCancel }: props) {
    return (
        <TabsContent value={tab} className="flex-grow">
            <section className="flex h-full flex-col gap-3 rounded-xl bg-background px-4 py-5 shadow">
                {booking.map((order, index) => (
                    <OrderDetail key={index} tab={tab} booking={order} onCancel={onCancel} />
                ))}
            </section>
        </TabsContent>
    );
}
