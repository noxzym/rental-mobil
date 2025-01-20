"use client";

import { ComponentProps, useState } from "react";
import { Prisma, StatusBooking, StatusMobil } from "@prisma/client";
import { CiLocationArrow1, CiTimer } from "react-icons/ci";
import { updateBooking } from "@/lib/actions";
import { formatCurrency, formatDate, getBookingDuration, getBookingPrices } from "@/lib/utils";
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
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet";

type props = {
    tab: string;
    booking: Prisma.bookingGetPayload<{ include: { mobil: true; kabukota: true } }>;
};

export default function OrderDetail({ tab, booking }: props) {
    const isDesktop = useMediaQuery("(min-width: 768px)");
    const [open, setOpen] = useState(false);

    const title = `Informasi Penyewaan`;
    const hargaSewa = formatCurrency(booking.mobil?.harga ?? 0);
    const durasi = getBookingDuration(booking.startDate, booking.endDate);
    const totalBiaya = getBookingPrices(booking.mobil?.harga ?? 0, durasi);

    const CarData: ComponentProps<"input">[] = [
        {
            name: "Merek",
            value: booking.mobil?.merek
        },
        {
            name: "Model",
            value: booking.mobil?.model
        },
        {
            name: "Warna",
            value: booking.mobil?.warna
        },
        {
            name: "Transmisi",
            value: booking.mobil?.transmisi
        },
        {
            name: "Nomor Plat",
            value: booking.mobil?.plat
        }
    ];

    const BookingData: ComponentProps<"input">[] = [
        {
            name: "Penjemputan",
            value: formatDate(booking.startDate)
        },
        {
            name: "Pengembalian",
            value: formatDate(booking.endDate)
        },
        {
            name: "Pengemudi",
            value: booking.mobil?.warna
        },
        {
            name: "Kota Tujuan",
            value: booking.kabukota?.nama.toLowerCase()
        },
        {
            name: "Status Penyewaan",
            value:
                tab === "ongoing"
                    ? "Sedang Berlangsung"
                    : tab === "finished"
                      ? "Selesai"
                      : "Dibatalkan"
        }
    ];

    const PriceData: ComponentProps<"input">[] = [
        {
            name: "Harga Sewa",
            value: hargaSewa
        },
        {
            name: "Durasi",
            value: `${durasi} Hari`
        },
        {
            name: "Total Biaya",
            value: totalBiaya
        }
    ];

    function triggerButton() {
        return (
            <Card className="grid cursor-pointer grid-cols-5 items-center gap-4 border-none p-3 transition-all duration-150 hover:bg-foreground/5 hover:shadow">
                <Avatar className="aspect-video h-auto w-full !rounded-lg">
                    <AvatarImage
                        src={booking.mobil?.gambar}
                        alt={`${booking.mobil?.merek} ${booking.mobil?.model}`}
                        className="object-cover"
                    />
                    <AvatarFallback useDynamicLoader={true} />
                </Avatar>
                <div className="col-span-2 flex flex-col gap-1 py-1">
                    <p className="text-lg font-semibold">
                        {booking.mobil?.merek} {booking.mobil?.model}
                    </p>
                    <p className="text-sm font-medium capitalize">
                        <CiLocationArrow1 className="mr-1 inline size-4" />
                        {booking.kabukota?.nama.toLowerCase()}
                    </p>
                    <p className="text-sm font-medium">
                        <CiTimer className="mr-1 inline size-4" />
                        {durasi} Hari
                    </p>
                </div>
                <div className="col-span-2 flex flex-col items-center gap-2 border-l-1">
                    <p className="font-bold">Total Harga</p>
                    <p className="text-lg font-bold">{totalBiaya}</p>
                </div>
            </Card>
        );
    }

    async function handleCancelBookingButton() {
        await updateBooking({
            where: { id: booking.id },
            data: {
                status: StatusBooking.Canceled,
                mobil: {
                    update: {
                        status: StatusMobil.Ready
                    }
                }
            }
        });

        setOpen(false);
    }

    if (isDesktop) {
        return (
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>{triggerButton()}</SheetTrigger>
                <SheetContent
                    className="flex flex-col overflow-y-scroll rounded-l-xl py-10"
                    aria-describedby={undefined}
                >
                    <SheetHeader>
                        <SheetTitle>{title}</SheetTitle>
                        <SheetDescription>#{booking.id}</SheetDescription>
                    </SheetHeader>
                    <Separator />
                    <div className="grid grid-cols-4 gap-5">
                        <Card className="col-span-4 flex h-fit flex-col gap-4">
                            <CardContent className="grid grid-cols-3 gap-5 pt-6">
                                <Avatar className="aspect-square h-auto w-full !rounded-lg">
                                    <AvatarImage
                                        src={booking.mobil?.gambar}
                                        alt={`${booking.mobil?.merek} ${booking.mobil?.model}`}
                                        className="bg-black object-contain"
                                    />
                                    <AvatarFallback useDynamicLoader={true} />
                                </Avatar>
                                <div className="col-span-2 flex flex-col gap-3">
                                    {CarData.map((data, index) => (
                                        <div key={index} className="grid grid-cols-5 items-center">
                                            <p className="text-sm">{data.name}</p>
                                            <Input
                                                value={data.value}
                                                disabled={true}
                                                className={`col-span-4 !cursor-default bg-gray-50 ${data.name === "Transmisi" ? "capitalize" : ""}`}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="col-span-4 flex flex-col gap-4 pt-6">
                            <CardContent className="grid grid-cols-4 gap-5">
                                <div className="col-span-2 flex flex-col gap-3">
                                    {BookingData.map((data, index) => (
                                        <div key={index} className="grid grid-cols-5 items-center">
                                            <p className="text-sm">{data.name}</p>
                                            <Input
                                                value={data.value}
                                                disabled={true}
                                                className={`col-span-4 !cursor-default bg-gray-50 ${data.name === "Kota Tujuan" ? "capitalize" : ""}`}
                                            />
                                        </div>
                                    ))}
                                </div>
                                <div className="col-span-2 flex flex-col gap-3">
                                    {PriceData.map((data, index) => (
                                        <div key={index} className="grid grid-cols-5 items-center">
                                            <p className="text-sm">{data.name}</p>
                                            <Input
                                                value={data.value}
                                                disabled={true}
                                                className="col-span-4 !cursor-default bg-gray-50"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <SheetFooter>
                        {tab === "ongoing" && (
                            <Button
                                variant="destructive"
                                className="w-full"
                                onClick={handleCancelBookingButton}
                            >
                                Batalkan Pesanan
                            </Button>
                        )}
                    </SheetFooter>
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
                    <DrawerDescription>#{booking.id}</DrawerDescription>
                </DrawerHeader>
                <Separator />
                <div className="flex flex-col gap-5 overflow-y-auto p-4">
                    <Avatar className="aspect-square h-auto w-full !rounded-lg">
                        <AvatarImage
                            src={booking.mobil?.gambar}
                            alt={`${booking.mobil?.merek} ${booking.mobil?.model}`}
                            className="bg-black object-contain"
                        />
                        <AvatarFallback useDynamicLoader={true} />
                    </Avatar>
                    <div className="flex flex-col gap-3">
                        {CarData.map((data, index) => (
                            <div key={index} className="grid grid-cols-5 items-center">
                                <p className="col-span-2 text-sm">{data.name}</p>
                                <Input
                                    value={data.value}
                                    disabled={true}
                                    className={`col-span-4 !cursor-default bg-gray-50 ${data.name === "Transmisi" ? "capitalize" : ""}`}
                                />
                            </div>
                        ))}
                        {BookingData.map((data, index) => (
                            <div key={index} className="grid grid-cols-5 items-center">
                                <p className="col-span-2 text-sm">{data.name}</p>
                                <Input
                                    value={data.value}
                                    disabled={true}
                                    className={`col-span-4 !cursor-default bg-gray-50 ${data.name === "Kota Tujuan" ? "capitalize" : ""}`}
                                />
                            </div>
                        ))}
                        {PriceData.map((data, index) => (
                            <div key={index} className="grid grid-cols-5 items-center">
                                <p className="col-span-2 text-sm">{data.name}</p>
                                <Input
                                    value={data.value}
                                    disabled={true}
                                    className="col-span-4 !cursor-default bg-gray-50"
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <DrawerFooter className="pt-2">
                    {tab === "ongoing" && (
                        <Button
                            variant="destructive"
                            className="w-full"
                            onClick={handleCancelBookingButton}
                        >
                            Batalkan Pesanan
                        </Button>
                    )}
                    <DrawerClose asChild>
                        <Button variant="outline" className="w-full">
                            Close
                        </Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
