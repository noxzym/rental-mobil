"use client";

import { ComponentProps, useEffect, useState } from "react";
import { Prisma, Transmisi } from "@prisma/client";
import { Edit2, Save, Trash, X } from "lucide-react";
import { PiPalette } from "react-icons/pi";
import { PiSeatbelt } from "react-icons/pi";
import { RiSteeringLine } from "react-icons/ri";
import { RxCardStackMinus } from "react-icons/rx";
import { formatCurrency } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-mediaQuery";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet";

type props = {
    mobil: Prisma.mobilGetPayload<{}>;
};

export default function Car({ mobil }: props) {
    const isDesktop = useMediaQuery("(min-width: 768px)");
    const [open, setOpen] = useState(false);

    const title = `Informasi Kendaraan`;
    const hargaSewa = formatCurrency(mobil.harga);

    const CarData: ComponentProps<"input">[] = [
        {
            name: "Merek",
            value: mobil.merek,
            type: "text"
        },
        {
            name: "Model",
            value: mobil.model,
            type: "text"
        },
        {
            name: "Warna",
            value: mobil.warna,
            type: "text"
        },
        {
            name: "Tahun",
            value: mobil.tahun,
            type: "text"
        },
        {
            name: "Transmisi",
            value: mobil.transmisi,
            type: "text"
        },
        {
            name: "Nomor Plat",
            value: mobil.plat,
            type: "text"
        },
        {
            name: "Status",
            value: mobil.status,
            type: "text"
        },
        {
            name: "Jumlah Kursi",
            value: mobil.bangku,
            type: "number"
        },
        {
            name: "Harga Sewa",
            value: mobil.harga,
            type: "text"
        }
    ];

    function triggerButton() {
        return (
            <Card className="grid cursor-pointer grid-cols-5 items-center gap-4 border-none p-3 transition-all duration-150 hover:bg-foreground/5 hover:shadow">
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

    // function ActionButton() {
    //     return (
    //         <div className="grid grid-cols-2 gap-2">
    //             {!carStore.isEditing ? (
    //                 <>
    //                     <Button variant="outline" className="gap-2" onClick={handleEditButton}>
    //                         <Edit2 className="h-4 w-4" />
    //                         Edit
    //                     </Button>
    //                     <Button
    //                         variant="destructive"
    //                         className="gap-2"
    //                         onClick={handleDeleteButton}
    //                     >
    //                         <Trash className="h-4 w-4" />
    //                         Delete
    //                     </Button>
    //                 </>
    //             ) : (
    //                 <>
    //                     <Button
    //                         onClick={handleCancelButton}
    //                         variant="outline"
    //                         className={`gap-2 ${!carStore.isEditing ? "hidden" : ""}`}
    //                     >
    //                         <X className="h-4 w-4" />
    //                         Cancel
    //                     </Button>
    //                     <Button
    //                         onClick={handleSaveButton}
    //                         variant="default"
    //                         className={`gap-2 ${!carStore.isEditing ? "hidden" : ""}`}
    //                     >
    //                         <Save className="h-4 w-4" />
    //                         Save
    //                     </Button>
    //                 </>
    //             )}
    //         </div>
    //     );
    // }

    if (isDesktop) {
        return (
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>{triggerButton()}</SheetTrigger>
                <SheetContent
                    className="flex flex-col gap-0 overflow-y-scroll rounded-l-xl py-10"
                    aria-describedby={undefined}
                >
                    <SheetHeader className="flex-row items-end justify-between">
                        <div className="flex flex-col space-y-2 text-center sm:text-left">
                            <SheetTitle>{title}</SheetTitle>
                            <SheetDescription>#{mobil.id}</SheetDescription>
                        </div>
                    </SheetHeader>
                    <Separator className="mt-4" />
                    <Card className="grid grid-cols-3 gap-5 border-none p-4 shadow-none">
                        <div className="flex flex-col justify-between">
                            <div className="flex flex-col gap-3">
                                <Avatar className="aspect-square h-auto w-full !rounded-lg">
                                    <AvatarImage
                                        src={mobil.gambar}
                                        alt={`${mobil.merek} ${mobil.model}`}
                                        className="bg-black object-contain"
                                    />
                                    <AvatarFallback useDynamicLoader={true} />
                                </Avatar>
                                {/* {carStore.isEditing && (
                                    <Button variant="outline" className="font-semibold">
                                        Pilih Foto
                                    </Button>
                                )} */}
                            </div>
                            {/* <ActionButton /> */}
                        </div>
                        <div className="col-span-2 flex flex-col gap-3">
                            {CarData.map((data, index) => (
                                <div key={index} className="grid grid-cols-5 items-center">
                                    <p className="text-sm">{data.name}</p>
                                    <Input
                                        name={data.name}
                                        type={data.type}
                                        value={data.value}
                                        disabled={true}
                                        className="col-span-4 !cursor-default bg-gray-50"
                                    />
                                </div>
                            ))}
                        </div>
                    </Card>
                </SheetContent>
            </Sheet>
        );
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>{triggerButton()}</DrawerTrigger>
            <DrawerContent className="flex h-full flex-col" aria-describedby={undefined}>
                <DrawerHeader className="text-left">
                    <DrawerTitle className="text-2xl">{title}</DrawerTitle>
                    <DrawerDescription>#{mobil.id}</DrawerDescription>
                </DrawerHeader>
                <Separator />
                <div className="flex flex-col gap-5 overflow-y-auto p-4">
                    <Avatar className="aspect-square h-auto w-full !rounded-lg">
                        <AvatarImage
                            src={mobil.gambar}
                            alt={`${mobil.merek} ${mobil.model}`}
                            className="bg-black object-contain"
                        />
                        <AvatarFallback useDynamicLoader={true} />
                    </Avatar>
                    <div className="flex flex-col gap-3">
                        {CarData.map((data, index) => (
                            <div key={index} className="grid grid-cols-5 items-center">
                                <p className="col-span-2 text-sm">{data.name}</p>
                                <Input
                                    name={data.name}
                                    type={data.type}
                                    value={data.value}
                                    disabled={true}
                                    className="col-span-3 !cursor-default bg-gray-50"
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <DrawerFooter>
                    {/* <ActionButton /> */}
                    {/* {!carStore.isEditing ? ( */}
                    <DrawerClose asChild>
                        <Button>Close</Button>
                    </DrawerClose>
                    {/* ) : ( */}
                    {/* <Button variant="outline">Ubah Foto</Button> */}
                    {/* )} */}
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
