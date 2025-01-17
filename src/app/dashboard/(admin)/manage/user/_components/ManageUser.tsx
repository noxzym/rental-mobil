"use client";

import { ChangeEvent, ComponentProps, useEffect, useState } from "react";
import { Prisma, Transmisi } from "@prisma/client";
import { Edit2, Save, Trash, X } from "lucide-react";
import { PiPalette } from "react-icons/pi";
import { PiSeatbelt } from "react-icons/pi";
import { RiSteeringLine } from "react-icons/ri";
import { RxCardStackMinus } from "react-icons/rx";
import { formatCurrency } from "@/lib/utils";
import { CarStoreType, useCarStore } from "@/hooks/floppy-disk/use-carStore";
import { useMediaQuery } from "@/hooks/use-mediaQuery";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
    account: Prisma.accountGetPayload<{
        include: {
            kelurahan: {
                include: {
                    kecamatan: {
                        include: {
                            kabukota: {
                                include: {
                                    provinsi: true;
                                };
                            };
                        };
                    };
                };
            };
        };
    }>;
    onDelete?: (id: string) => void;
};

export default function ManageUser({ account, onDelete }: props) {
    const isDesktop = useMediaQuery("(min-width: 768px)");
    const [open, setOpen] = useState(false);

    const title = `Informasi Customer`;

    const accountData: ComponentProps<"input">[] = [
        {
            name: "Nama",
            value: account.nama ?? "Belum Diatur",
            type: "text"
        },
        {
            name: "Email",
            value: account.email,
            type: "text"
        },
        {
            name: "Nomor Telepon",
            value: account.noTelepon ?? "Belum Diatur",
            type: "text"
        }
        // {
        //     name: "Tahun",
        //     value: carStore.tahun,
        //     type: "text"
        // },
        // {
        //     name: "Transmisi",
        //     value: carStore.transmisi,
        //     type: "text"
        // },
        // {
        //     name: "Nomor Plat",
        //     value: carStore.plat,
        //     type: "text"
        // },
        // {
        //     name: "Status",
        //     value: carStore.status,
        //     type: "text"
        // },
        // {
        //     name: "Jumlah Kursi",
        //     value: carStore.bangku,
        //     type: "number"
        // },
        // {
        //     name: "Harga Sewa",
        //     value: carStore.harga,
        //     type: "text"
        // }
    ];

    function handleDeleteButton() {
        setOpen(false);
        onDelete && onDelete(account.id);
    }

    function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        // switch (name) {
        //     case "Merek":
        //         useCarStore.set({ id: mobil.id }, { merek: value });
        //         break;
        //     case "Model":
        //         useCarStore.set({ id: mobil.id }, { model: value });
        //         break;
        //     case "Warna":
        //         useCarStore.set({ id: mobil.id }, { warna: value });
        //         break;
        //     case "Tahun":
        //         useCarStore.set({ id: mobil.id }, { tahun: value });
        //         break;
        //     case "Transmisi":
        //         useCarStore.set({ id: mobil.id }, { transmisi: value.toUpperCase() as Transmisi });
        //         break;
        //     case "Nomor Plat":
        //         useCarStore.set({ id: mobil.id }, { plat: value });
        //         break;

        //     case "Jumlah Kursi":
        //         useCarStore.set({ id: mobil.id }, { bangku: parseInt(value) });
        //         break;

        //     case "Harga Sewa":
        //         useCarStore.set({ id: mobil.id }, { harga: parseInt(value) });
        //         break;
        // }
    }

    function triggerButton() {
        return (
            <Card className="flex cursor-pointer items-center gap-4 border-none p-3 transition-all duration-150 hover:bg-foreground/5 hover:shadow">
                <Avatar className="size-14">
                    <AvatarImage
                        src={account.avatar ?? ""}
                        alt={account.nama?.split(" ")[0]}
                        className="object-cover"
                    />
                    <AvatarFallback />
                </Avatar>
                <div className="flex flex-col gap-1 py-1">
                    <p className="font-medium">{account.nama}</p>
                    <p className="text-sm font-medium text-gray-500">{account.email}</p>
                    {/* <p className="col-span-4 text-lg font-semibold">
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
                    </div> */}
                </div>
            </Card>
        );
    }

    function ActionButton() {
        return (
            <div className="grid grid-cols-2 gap-2">
                {/* {!carStore.isEditing ? (
                    <>
                        <Button variant="outline" className="gap-2" onClick={handleEditButton}>
                            <Edit2 className="h-4 w-4" />
                            Edit
                        </Button>
                        <Button
                            variant="destructive"
                            className="gap-2"
                            onClick={handleDeleteButton}
                        >
                            <Trash className="h-4 w-4" />
                            Delete
                        </Button>
                    </>
                ) : (
                    <>
                        <Button
                            onClick={handleCancelButton}
                            variant="outline"
                            className={`gap-2 ${!carStore.isEditing ? "hidden" : ""}`}
                        >
                            <X className="h-4 w-4" />
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSaveButton}
                            variant="default"
                            className={`gap-2 ${!carStore.isEditing ? "hidden" : ""}`}
                        >
                            <Save className="h-4 w-4" />
                            Save
                        </Button>
                    </>
                )} */}
            </div>
        );
    }

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
                            <SheetDescription>#{account.id}</SheetDescription>
                        </div>
                    </SheetHeader>
                    <Separator className="mt-4" />
                    <Card className="grid grid-cols-3 gap-5 border-none p-4 shadow-none">
                        <div className="flex flex-col justify-between">
                            <div className="flex flex-col gap-3">
                                <Avatar className="size-40 !rounded-lg">
                                    <AvatarImage
                                        src={account.avatar ?? ""}
                                        alt={account.nama?.split(" ")[0]}
                                        className="bg-black object-contain"
                                    />
                                    <AvatarFallback />
                                </Avatar>
                                {/* {carStore.isEditing && (
                                        <Button variant="outline" className="font-semibold">
                                            Pilih Foto
                                        </Button>
                                    )} */}
                            </div>
                            <ActionButton />
                        </div>
                        <div className="col-span-2 flex flex-col gap-3">
                            {/* {CarData.map((data, index) => (
                                    <div key={index} className="grid grid-cols-5 items-center">
                                        <p className="text-sm">{data.name}</p>
                                        <Input
                                            name={data.name}
                                            type={data.type}
                                            value={data.value}
                                            onChange={handleOnChange}
                                            disabled={!carStore.isEditing}
                                            className="col-span-4 !cursor-default bg-gray-50"
                                        />
                                    </div>
                                ))} */}
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
                    <DrawerDescription>#{account.id}</DrawerDescription>
                </DrawerHeader>
                <Separator />
                <div className="flex flex-col gap-5 overflow-y-auto p-4">
                    <Avatar className="aspect-square h-auto w-full !rounded-lg">
                        <AvatarImage
                            src={account.avatar ?? ""}
                            alt={account.nama?.split(" ")[0]}
                            className="bg-black object-contain"
                        />
                        <AvatarFallback useDynamicLoader={true} />
                    </Avatar>
                    <div className="flex flex-col gap-3">
                        {/* {CarData.map((data, index) => (
                            <div key={index} className="grid grid-cols-5 items-center">
                                <p className="col-span-2 text-sm">{data.name}</p>
                                <Input
                                    name={data.name}
                                    type={data.type}
                                    value={data.value}
                                    onChange={handleOnChange}
                                    disabled={!carStore.isEditing}
                                    className="col-span-3 !cursor-default bg-gray-50"
                                />
                            </div>
                        ))} */}
                    </div>
                </div>
                <DrawerFooter>
                    <ActionButton />
                    {/* {!carStore.isEditing ? (
                        <DrawerClose asChild>
                            <Button>Close</Button>
                        </DrawerClose>
                    ) : (
                        <Button variant="outline">Ubah Foto</Button>
                    )} */}
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
