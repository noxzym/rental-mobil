"use client";

import { Prisma } from "@prisma/client";
import { PiPalette } from "react-icons/pi";
import { PiSeatbelt } from "react-icons/pi";
import { RiSteeringLine } from "react-icons/ri";
import { cn, formatCurrency } from "@/lib/utils";
import { useCarStore } from "@/hooks/floppy-disk/use-carStore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";

type props = {
    mobil: Prisma.mobilGetPayload<{}>;
};

export default function Car({ mobil }: props) {
    const carStore = useCarStore({ id: "selected" });

    const handleSelectCar = () => {
        useCarStore.set(
            {
                id: "selected"
            },
            {
                ...mobil
            }
        );
    };

    const hargaSewa = formatCurrency(mobil.harga);

    return (
        <Card
            onClick={handleSelectCar}
            className={cn(
                "grid cursor-pointer grid-cols-5 items-center gap-4 border-none p-3 transition-all duration-150 hover:bg-foreground/5 hover:shadow",
                carStore.id === mobil.id && "bg-foreground/5 shadow"
            )}
        >
            <Avatar className="aspect-video h-auto w-full !rounded-lg">
                <AvatarImage
                    src={mobil.gambar}
                    alt={`${mobil.merek} ${mobil.model}`}
                    className="object-cover"
                />
                <AvatarFallback useDynamicLoader={true} />
            </Avatar>
            <div className="col-span-2 grid grid-cols-4 gap-1 py-1">
                <p className="col-span-4 text-lg font-semibold">
                    {mobil.merek} {mobil.model} ({mobil.tahun})
                </p>
                <div className="col-span-4 grid w-full grid-cols-2 gap-1">
                    <p className="text-sm font-medium">
                        <RiSteeringLine className="mr-1 inline size-4 capitalize" />
                        {mobil.transmisi.toLowerCase()}
                    </p>
                    <p className="text-sm font-medium">
                        <PiPalette className="mr-1 inline size-4" />
                        {mobil.warna}
                    </p>
                    <p className="text-sm font-medium">
                        <PiSeatbelt className="mr-1 inline size-4" />
                        {mobil.bangku} Kursi
                    </p>
                </div>
            </div>
            <div className="col-span-2 flex flex-col items-center gap-2 border-l-1">
                <p className="font-bold">Harga Sewa</p>
                <p className="text-lg font-bold">{hargaSewa} / Hari</p>
            </div>
        </Card>
    );
}
