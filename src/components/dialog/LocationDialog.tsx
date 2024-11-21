import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { IoSearch } from "react-icons/io5";
import { MdLocationOn } from "react-icons/md";
import { cn } from "@/lib/utils";
import { useDebounce } from "@/hooks/use-debounce";
import { useMediaQuery } from "@/hooks/use-mediaQuery";
import { useWilayahQuery } from "@/hooks/use-wilayahQuery";
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
import { Separator } from "../ui/separator";

interface prop {
    searchParams: string;
    className?: string;
}

export default function LocationDialog({ searchParams, className }: prop) {
    const [open, setOpen] = useState(false);
    const [location, setLocation] = useState<string>();
    const [inputValue, setInputValue] = useState<string>();

    const inputDebouncedValue = useDebounce(inputValue);
    const isDesktop = useMediaQuery("(min-width: 768px)");
    const router = useRouter();
    const pathname = usePathname();

    const { data } = useWilayahQuery({
        inputDebouncedValue: open ? inputDebouncedValue?.toUpperCase() : location
    });

    useEffect(() => {
        const params = new URLSearchParams(searchParams);
        const locationQueryId = params.get("location");

        if (locationQueryId && !location) {
            return setLocation(locationQueryId);
        }

        const loc = data?.find(({ id }) => id === locationQueryId);
        if (!loc) return;

        setLocation(loc.nama.toLowerCase().replace("kab.", "kabupaten"));
    }, [searchParams, data, location]);

    const isSearchPage = pathname === "/search";
    const title = "Pilih Kota Tujuan";
    const input = (
        <Input
            icon={<IoSearch />}
            type="text"
            placeholder="Bali"
            className="text-lg text-foreground"
            onChange={e => setInputValue(e.target.value)}
        />
    );

    function triggerButton() {
        return (
            <Button
                variant={isSearchPage ? "ghost" : "outline"}
                className={cn("justify-start font-semibold capitalize", className)}
            >
                {!isSearchPage && <MdLocationOn />}
                {location?.toLowerCase().replace("kab.", "kabupaten") ?? "Jakarta"}
            </Button>
        );
    }

    function handleSelect(id: string) {
        const selectedLocation = data?.find(({ id: locationId }) => locationId === id)?.nama;
        setLocation(selectedLocation);

        const params = new URLSearchParams(searchParams);
        params.set("location", id);
        router.push(`${pathname}?${params.toString()}`);

        setOpen(false);
    }

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>{triggerButton()}</DialogTrigger>
                <DialogContent className="flex h-[400px] flex-col py-10">
                    <DialogHeader>
                        <DialogTitle className="text-2xl">{title}</DialogTitle>
                        {input}
                    </DialogHeader>
                    <Separator />
                    <div className="flex flex-col overflow-y-auto">
                        {data?.map(({ id, nama, provinsi }) => (
                            <Button
                                key={id}
                                variant="ghost"
                                className="cursor-pointer justify-start gap-4 py-8 [&_svg]:size-8"
                                onClick={() => handleSelect(id)}
                                asChild
                            >
                                <div>
                                    <MdLocationOn />
                                    <div className="flex flex-col">
                                        <div className="text-lg font-bold capitalize">
                                            {nama.toLowerCase().replace("kab.", "kabupaten")}
                                        </div>
                                        <div className="capitalize text-gray-500">
                                            {provinsi.nama.toLowerCase()}, Indonesia
                                        </div>
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
            <DrawerContent className="flex h-full max-h-[75vh] flex-col">
                <DrawerHeader className="text-left">
                    <DrawerTitle className="text-2xl">{title}</DrawerTitle>
                    {input}
                </DrawerHeader>
                <Separator />
                <div className="flex flex-col overflow-y-auto">
                    {data?.map(({ id, nama, provinsi }) => (
                        <Button
                            key={id}
                            variant="ghost"
                            className="cursor-pointer justify-start gap-4 py-8 [&_svg]:size-8"
                            onClick={() => handleSelect(id)}
                            asChild
                        >
                            <div>
                                <MdLocationOn />
                                <div className="flex flex-col">
                                    <div className="text-lg font-bold capitalize">
                                        {nama.toLowerCase().replace("kab.", "kabupaten")}
                                    </div>
                                    <div className="capitalize text-gray-500">
                                        {provinsi.nama.toLowerCase()}, Indonesia
                                    </div>
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
