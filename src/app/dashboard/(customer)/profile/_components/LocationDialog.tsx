"use client";

import { ChangeEvent, ComponentProps, useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { MdLocationOn } from "react-icons/md";
import { cn } from "@/lib/utils";
import { useProfileStore } from "@/hooks/floppy-disk/use-profileStore";
import { useWilayahQuery } from "@/hooks/floppy-disk/use-wilayahQuery";
import { useDebounce } from "@/hooks/use-debounce";
import { useMediaQuery } from "@/hooks/use-mediaQuery";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import { CustomInput } from "@/components/CustomInput";

type props = {
    bagian: "provinsi" | "kabukota" | "kecamatan" | "kelurahan";
    parent?: string;
} & ComponentProps<"input">;

export default function LocationDialog({
    parent,
    bagian,
    value,
    placeholder,
    disabled,
    className
}: props) {
    const isDesktop = useMediaQuery("(min-width: 768px)");
    const [open, setOpen] = useState(false);
    const [newState, setNewState] = useState<string | null>(null);

    useEffect(() => {
        let isAssignment = false;
        if (!isAssignment && newState === null) {
            setNewState(value as string);
            isAssignment = true;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const wilayah = useProfileStore(bagian);
    const inputDebounce = useDebounce(newState);
    const query = open ? inputDebounce : (wilayah ?? inputDebounce);

    const { data } = useWilayahQuery({
        endpoint: `/${bagian}`,
        query: query ?? undefined,
        parent
    });

    const title = `Pilih ${bagian === "kabukota" ? "Kabupaten/Kota" : bagian}`;
    const input = (
        <CustomInput
            icon={<IoSearch />}
            type="text"
            placeholder={placeholder}
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
                variant="outline"
                disabled={disabled}
                className={cn("justify-start capitalize", className)}
            >
                {data
                    ?.find(({ id }) => id === (wilayah ?? (value as string)))
                    ?.nama.toLowerCase()
                    .replace("kab.", "kabupaten") ?? "Belum Diatur"}
            </Button>
        );
    }

    function handleSelect(id: string) {
        const selectedLocation = data?.find(({ id: locationId }) => locationId === id);
        if (!selectedLocation) return;

        switch (bagian) {
            case "provinsi":
                useProfileStore.set({
                    provinsi: selectedLocation.id,
                    kabukota: null,
                    kecamatan: null,
                    kelurahan: null
                });
                break;

            case "kabukota":
                useProfileStore.set({
                    kabukota: selectedLocation.id,
                    kecamatan: null,
                    kelurahan: null
                });
                break;

            case "kecamatan":
                useProfileStore.set({
                    kecamatan: selectedLocation.id,
                    kelurahan: null
                });
                break;

            case "kelurahan":
                useProfileStore.set({ kelurahan: selectedLocation.id });
                break;
        }

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
                        <DialogTitle className="text-2xl capitalize">{title}</DialogTitle>
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
                                    <div className="text-lg font-bold capitalize">
                                        {zone.nama.toLowerCase().replace("kab.", "kabupaten")}
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
                    <DrawerTitle className="text-2xl capitalize">{title}</DrawerTitle>
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
                                <div className="text-lg font-bold capitalize">
                                    {zone.nama.toLowerCase().replace("kab.", "kabupaten")}
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
