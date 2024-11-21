import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { format } from "date-fns";
import { IoCalendar } from "react-icons/io5";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-mediaQuery";
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
    searchParams: string;
    className?: string;
}

export default function ScheduleDialog({ searchParams, className }: prop) {
    const router = useRouter();
    const pathname = usePathname();

    const [open, setOpen] = useState(false);
    const [date, setDate] = useState<Date>();
    const isDesktop = useMediaQuery("(min-width: 768px)");

    useEffect(() => {
        if (!date) return;

        const params = new URLSearchParams(searchParams);
        params.set("date", date.getTime().toString());

        router.push(`${pathname}?${params.toString()}`);
    }, [date, pathname, router, searchParams]);

    const isSearchPage = pathname === "/search";
    const title = "Pilih Tanggal Penjemputan";
    const content = (numberOfMount = 1) => (
        <Calendar
            mode="single"
            selected={date}
            onSelect={handleSelect}
            numberOfMonths={numberOfMount}
            className="rounded-md border"
            classNames={{
                table: "mx-auto border-collapse space-y-1"
            }}
        />
    );

    function handleSelect(date?: Date) {
        setDate(date);
        setOpen(false);
    }

    function triggerButton() {
        return (
            <Button
                variant={isSearchPage ? "ghost" : "outline"}
                className={cn("justify-start font-semibold", className)}
            >
                {!isSearchPage && <IoCalendar />}
                {format(date ?? new Date(), "dd MMM yyyy")}
            </Button>
        );
    }

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>{triggerButton()}</DialogTrigger>
                <DialogContent className="w-fit !max-w-none py-10">
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
            <DrawerContent>
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
