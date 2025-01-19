import { MouseEvent, useState } from "react";
import { IoCarOutline } from "react-icons/io5";
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

interface prop {
    isSearchPage?: boolean;
    displayIcon?: boolean;
    className?: string;
}

export default function DriverDialog({ isSearchPage, displayIcon, className }: prop) {
    const driver = useQueryStore("driver");
    const isDesktop = useMediaQuery("(min-width: 768px)");
    const [open, setOpen] = useState(false);

    const title = "Pilih Tipe Penyewaan";
    const Content = () => (
        <section className="flex gap-3">
            <Button
                id="with"
                size="sm"
                variant="outline"
                className={cn(
                    "flex-grow hover:bg-[rgba(11,95,204)] hover:text-background",
                    driver && "bg-[#1877F2] text-background"
                )}
                onClick={handleSelect}
            >
                Dengan Driver
            </Button>
            <Button
                id="without"
                size="sm"
                variant="outline"
                className={cn(
                    "flex-grow hover:bg-[rgba(11,95,204)] hover:text-background",
                    !driver && "bg-[#1877F2] text-background"
                )}
                onClick={handleSelect}
            >
                Tanpa Driver
            </Button>
        </section>
    );

    function handleSelect(e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) {
        useQueryStore.set({ driver: e.currentTarget.id === "with" });
        setOpen(false);
    }

    function triggerButton() {
        return (
            <Button
                variant={isSearchPage ? "ghost" : "outline"}
                className={cn("justify-start font-semibold capitalize", className)}
            >
                {displayIcon && <IoCarOutline />}
                {driver ? "Dengan Driver" : "Tanpa Driver"}
            </Button>
        );
    }

    if (!isSearchPage) {
        return <Content />;
    }

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>{triggerButton()}</DialogTrigger>
                <DialogContent className="py-10" aria-describedby={undefined}>
                    <DialogHeader>
                        <DialogTitle className="text-2xl">{title}</DialogTitle>
                    </DialogHeader>
                    <Content />
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
                <div className="min-h-60 p-4">
                    <Content />
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
