"use client";

import { ChangeEvent, useState } from "react";
import { usePathname } from "next/navigation";
import { IoSearch } from "react-icons/io5";
import { MdLocationOn } from "react-icons/md";
import { cn } from "@/lib/utils";
import { useQueryStore } from "@/hooks/floppy-disk/use-queryStore";
import { isSearchCase, useWilayahQuery } from "@/hooks/floppy-disk/use-wilayahQuery";
import { useDebounce } from "@/hooks/use-debounce";
import { useMediaQuery } from "@/hooks/use-mediaQuery";
import { CustomInput } from "../CustomInput";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from "../ui/drawer";
import { Separator } from "../ui/separator";

interface prop {
    className?: string;
}

export default function LocationDialog({ className }: prop) {
    const isDesktop = useMediaQuery("(min-width: 768px)");
    const [open, setOpen] = useState(false);
    const [newState, setNewState] = useState<string | null>(null);

    const location = useQueryStore("location");
    const inputDebounce = useDebounce(newState);
    const query = open ? inputDebounce : (location ?? inputDebounce);

    const { data } = useWilayahQuery({
        query: query ?? undefined
    });

    const pathname = usePathname();
    const isSearchPage = pathname === "/search";
    const title = "Pilih Kota Tujuan";
    const input = (
        <CustomInput
            icon={<IoSearch />}
            type="text"
            placeholder="Bali"
            className="text-lg text-foreground"
            onChange={onChange}
        />
    );

    function onChange(e: ChangeEvent<HTMLInputElement>) {
        setNewState(e.target.value);
    }

    function triggerButton() {
        return (
            <Button
                variant={isSearchPage ? "ghost" : "outline"}
                className={cn("justify-start font-semibold capitalize", className)}
            >
                {!isSearchPage && <MdLocationOn />}
                {data
                    ?.find(({ id }) => id === location)
                    ?.nama.toLowerCase()
                    .replace("kab.", "kabupaten") ?? "Kota Depok"}
            </Button>
        );
    }

    function handleSelect(id: string) {
        const selectedLocation = data?.find(({ id: locationId }) => locationId === id);
        if (!selectedLocation) return;

        useQueryStore.set({ location: selectedLocation.id });
        setOpen(false);
    }

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>{triggerButton()}</DialogTrigger>
                <DialogContent
                    className="flex h-[400px] flex-col py-10"
                    aria-describedby={undefined}
                >
                    <DialogHeader>
                        <DialogTitle className="text-2xl">{title}</DialogTitle>
                        {input}
                    </DialogHeader>
                    <Separator />
                    <div className="flex flex-col overflow-y-auto">
                        {data?.map((zone, index) => (
                            <Button
                                key={index}
                                variant="ghost"
                                className="cursor-pointer justify-start gap-4 py-8 [&_svg]:size-8"
                                onClick={() => handleSelect(zone.id)}
                                asChild
                            >
                                <div>
                                    <MdLocationOn />
                                    <div className="flex flex-col">
                                        <div className="text-lg font-bold capitalize">
                                            {zone.nama.toLowerCase().replace("kab.", "kabupaten")}
                                        </div>
                                        {isSearchCase(data) && (
                                            <div className="capitalize text-gray-500">
                                                {data[index].provinsi.nama.toLowerCase()}, Indonesia
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Button>
                        ))}
                    </div>
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>{triggerButton()}</DrawerTrigger>
            <DrawerContent
                className="flex h-full max-h-[75vh] flex-col"
                aria-describedby={undefined}
            >
                <DrawerHeader className="text-left">
                    <DrawerTitle className="text-2xl">{title}</DrawerTitle>
                    {input}
                </DrawerHeader>
                <Separator />
                <div className="flex flex-col overflow-y-auto">
                    {data?.map((zone, index) => (
                        <Button
                            key={index}
                            variant="ghost"
                            className="cursor-pointer justify-start gap-4 py-8 [&_svg]:size-8"
                            onClick={() => handleSelect(zone.id)}
                            asChild
                        >
                            <div>
                                <MdLocationOn />
                                <div className="flex flex-col">
                                    <div className="text-lg font-bold capitalize">
                                        {zone.nama.toLowerCase().replace("kab.", "kabupaten")}
                                    </div>
                                    {isSearchCase(data) && (
                                        <div className="capitalize text-gray-500">
                                            {data[index].provinsi.nama.toLowerCase()}, Indonesia
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Button>
                    ))}
                </div>
                <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                        <Button variant="secondary">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
