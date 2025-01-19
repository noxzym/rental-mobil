import { revalidatePath } from "next/cache";
import { StatusBooking, StatusMobil } from "@prisma/client";
import prisma from "@/lib/prisma";
import { CarStoreType } from "@/hooks/floppy-disk/use-carStore";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CarTab from "./_components/CarTab";

export default async function ManageCarPage() {
    const mobil = await prisma.mobil.findMany({
        include: {
            booking: {
                where: {
                    status: StatusBooking.OnGoing
                }
            }
        }
    });

    const readyCars = mobil.filter(car => car.status === StatusMobil.Ready);
    const onGoingCars = mobil.filter(car => car.status === StatusMobil.Booked);
    const inMaintenanceCars = mobil.filter(car => car.status === StatusMobil.Maintenance);

    const CarList = [
        {
            tab: "ready",
            mobil: readyCars
        },
        {
            tab: "maintenance",
            mobil: inMaintenanceCars
        },
        {
            tab: "booked",
            mobil: onGoingCars
        }
    ];

    async function handleSave(carStore: CarStoreType) {
        "use server";
        await prisma.mobil.update({
            where: { id: carStore.id },
            data: {
                ...carStore
            }
        });

        revalidatePath("/dashboard/manage-car");
    }

    async function handleDelete(id: string) {
        "use server";
        await prisma.mobil.delete({
            where: { id }
        });

        revalidatePath("/dashboard/manage-car");
    }

    return (
        <Tabs defaultValue="ready" className="col-span-3 flex flex-col">
            <TabsList className="sticky top-[92px] z-10 grid grid-cols-3 rounded-xl shadow [&_button]:rounded-xl">
                <TabsTrigger value="ready">Tersedia</TabsTrigger>
                <TabsTrigger value="maintenance">Dalam Perawatan</TabsTrigger>
                <TabsTrigger value="booked">Sedang Berjalan</TabsTrigger>
            </TabsList>
            {CarList.map((data, index) => (
                <CarTab
                    key={index}
                    tab={data.tab}
                    mobil={data.mobil}
                    onSave={handleSave}
                    onDelete={handleDelete}
                />
            ))}
        </Tabs>
    );
}
