"use client";

import { useState } from "react";
import { IoHourglassOutline } from "react-icons/io5";
import { cn } from "@/lib/utils";
import { useQueryStore } from "@/hooks/floppy-disk/use-queryStore";
import { useMediaQuery } from "@/hooks/use-mediaQuery";
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
import { ScrollArea } from "../ui/scroll-area";

interface prop {
    isSearchPage?: boolean;
    displayIcon?: boolean;
    className?: string;
}

export default function DurationDialog({ isSearchPage, displayIcon, className }: prop) {
    const duration = useQueryStore("duration");
    const isDesktop = useMediaQuery("(min-width: 768px)");
    const [open, setOpen] = useState(false);

    const title = "Pilih Durasi Sewa";
    const content = (
        <ScrollArea className="h-full">
            <div className="grid grid-cols-3 items-center justify-center gap-2 md:grid-cols-5">
                {new Array(30).fill(0).map((_, i) => (
                    <Button
                        key={i}
                        variant="outline"
                        className="justify-center font-semibold"
                        onClick={handleSelect.bind(null, i)}
                    >
                        {i + 1} hari
                    </Button>
                ))}
            </div>
        </ScrollArea>
    );

    function handleSelect(duration?: number) {
        useQueryStore.set({ duration: `${duration! + 1}` });
        setOpen(false);
    }

    function triggerButton() {
        return (
            <Button
                variant={isSearchPage ? "ghost" : "outline"}
                className={cn("justify-start font-semibold", className)}
            >
                {displayIcon && <IoHourglassOutline />}
                {duration.length ? duration : 1} hari
            </Button>
        );
    }

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>{triggerButton()}</DialogTrigger>
                <DialogContent className="py-10" aria-describedby={undefined}>
                    <DialogHeader>
                        <DialogTitle className="text-2xl">{title}</DialogTitle>
                    </DialogHeader>
                    {content}
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>{triggerButton()}</DrawerTrigger>
            <DrawerContent aria-describedby={undefined}>
                <DrawerHeader className="text-left">
                    <DrawerTitle className="text-2xl">{title}</DrawerTitle>
                </DrawerHeader>
                <div className="min-h-60 p-4">{content}</div>
                <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                        <Button variant="secondary">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
