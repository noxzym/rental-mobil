import { useEffect, useState } from "react";
import { ReadonlyURLSearchParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { IoSearch } from "react-icons/io5";
import { MdLocationOn } from "react-icons/md";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/useMediaQuery";
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
import { Input } from "../ui/input";

interface prop {
    searchParams: string;
    className?: string;
}

export default function LocationDialog({ searchParams, className }: prop) {
    const router = useRouter();
    const pathname = usePathname();

    const [open, setOpen] = useState(false);
    const [location, setLocation] = useState<string>();
    const isDesktop = useMediaQuery("(min-width: 768px)");

    useEffect(() => {
        if (!location) return;

        const params = new URLSearchParams(searchParams);
        params.set("location", location);

        router.push(`${pathname}?${params.toString()}`);
    }, [location, pathname, router, searchParams]);

    const isSearchPage = pathname === "/search";
    const title = "Pilih Lokasi Sewa";
    const content = (
        <Input
            icon={<IoSearch />}
            type="text"
            placeholder="Bali"
            className="text-lg text-foreground"
            onChange={e => setLocation(e.target.value)}
        />
    );

    function triggerButton() {
        return (
            <Button
                variant={isSearchPage ? "ghost" : "outline"}
                className={cn("justify-start font-semibold", className)}
            >
                {!isSearchPage && <MdLocationOn />}
                {location ?? "Jakarta"}
            </Button>
        );
    }

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>{triggerButton()}</DialogTrigger>
                <DialogContent className="py-10">
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
            <DrawerContent>
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
