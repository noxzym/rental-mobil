"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { IoSearch } from "react-icons/io5";
import { useQueryStore } from "@/hooks/floppy-disk/use-queryStore";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import SearchButton from "@/components/SearchButton";
import DateDialog from "@/components/dialog/DateDialog";
import DurationDialog from "@/components/dialog/DurationDialog";
import LocationDialog from "@/components/dialog/LocationDialog";
import TimeDialog from "@/components/dialog/TimeDialog";
import { Separator } from "./ui/separator";

export default function SearchSection() {
    const pathName = usePathname();
    const searchParams = useSearchParams();

    const isHomePage = pathName === "/";

    const date = searchParams.get("date");
    const duration = searchParams.get("duration");
    const location = searchParams.get("location");
    const time = searchParams.get("time");

    useQueryStore.setDefaultValues({
        date: date ?? Date.now().toString(),
        duration: duration ?? "1",
        location: location ?? "3276",
        time: time ?? ""
    });

    if (!isHomePage) {
        return (
            <section className="sticky top-[92px] z-10 flex w-full items-center justify-between rounded-xl border bg-background px-4 py-2 shadow">
                <div className="flex items-center">
                    <IoSearch size={20} />
                    <LocationDialog />
                    <Separator orientation="vertical" className="h-10" />
                    <DateDialog />
                    •
                    <TimeDialog />
                    <Separator orientation="vertical" className="h-10" />
                    <DurationDialog />
                </div>
                <SearchButton />
            </section>
        );
    }

    return (
        <Card className="rounded-xl p-2 md:w-2/5">
            <CardHeader>
                <CardTitle>Tentukan Tujuanmu</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid w-full items-center gap-4">
                    <LocationDialog />
                    <div className="flex w-full gap-2">
                        <DateDialog className="flex-grow" />
                        <TimeDialog />
                    </div>
                    <DurationDialog />
                </div>
            </CardContent>
            <CardFooter>
                <SearchButton />
            </CardFooter>
        </Card>
    );
}
