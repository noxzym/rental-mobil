"use client";

import { ComponentProps } from "react";
import { Prisma } from "@prisma/client";
import { PiPalette } from "react-icons/pi";
import { PiSeatbelt } from "react-icons/pi";
import { RiSteeringLine } from "react-icons/ri";
import { RxCardStackMinus } from "react-icons/rx";
import { formatCurrency } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { useSelectedCarStore } from "@/hooks/floppy-disk/use-selectedCarStore";

type props = {
    mobil: Prisma.mobilGetPayload<{}>;
};

export default function Car({ mobil }: props) {
    const { setSelectedCar } = useSelectedCarStore();

    const handleSelectCar = () => {
        setSelectedCar(mobil);
        console.log("Selected car:", mobil);
        console.log(useSelectedCarStore());
    };

    const hargaSewa = formatCurrency(mobil.harga);

    return (
        <Card
            onClick={handleSelectCar}
            className="grid cursor-pointer grid-cols-5 items-center gap-4 border-none p-3 transition-all duration-150 hover:bg-foreground/5 hover:shadow"
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
                <div className="col-span-2 flex flex-col gap-1">
                    <p className="text-sm font-medium">
                        <RxCardStackMinus className="mr-1 inline size-4" />
                        {mobil.plat}
                    </p>
                    <p className="text-sm font-medium">
                        <RiSteeringLine className="mr-1 inline size-4 capitalize" />
                        {mobil.transmisi.toLowerCase()}
                    </p>
                </div>
                <div className="col-span-2 flex flex-col gap-1">
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