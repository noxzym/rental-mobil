"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { format } from "date-fns";
import { IoCalendar } from "react-icons/io5";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-mediaQuery";
import { useQueryStore } from "@/hooks/use-queryStore";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
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

interface prop {
    className?: string;
}

export default function DateDialog({ className }: prop) {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    const isDesktop = useMediaQuery("(min-width: 768px)");
    const dateStored = useQueryStore("date");

    const isSearchPage = pathname === "/search";
    const title = "Pilih Tanggal Penjemputan";
    const content = (numberOfMount = 1) => (
        <Calendar
            mode="single"
            selected={new Date(dateStored.length ? Number(dateStored) : Date.now())}
            onSelect={handleSelect}
            numberOfMonths={numberOfMount}
            className="rounded-md border"
            classNames={{
                table: "mx-auto border-collapse space-y-1"
            }}
        />
    );

    function handleSelect(date?: Date) {
        if (!date) return;

        useQueryStore.set({ date: date?.getTime().toString() });
        setOpen(false);
    }

    function triggerButton() {
        return (
            <Button
                variant={isSearchPage ? "ghost" : "outline"}
                className={cn("justify-start font-semibold", className)}
            >
                {!isSearchPage && <IoCalendar />}
                {format(
                    new Date(dateStored.length ? Number(dateStored) : Date.now()),
                    "dd MMM yyyy"
                )}
            </Button>
        );
    }

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>{triggerButton()}</DialogTrigger>
                <DialogContent className="w-fit !max-w-none py-10" aria-describedby={undefined}>
                    <DialogHeader>
                        <DialogTitle className="text-2xl">{title}</DialogTitle>
                    </DialogHeader>
                    {content(2)}
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
                <div className="min-h-60 p-4">{content()}</div>
                <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                        <Button variant="secondary">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
