"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { IoSearch } from "react-icons/io5";
import { useQueryStore } from "@/hooks/floppy-disk/use-queryStore";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import SearchButton from "@/components/SearchButton";
import DateDialog from "@/components/dialog/DateDialog";
import DurationDialog from "@/components/dialog/DurationDialog";
import LocationDialog from "@/components/dialog/LocationDialog";
import TimeDialog from "@/components/dialog/TimeDialog";
import DriverDialog from "./dialog/DriverDialog";

export default function SearchSection() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const isSearchPage = pathname === "/search";

    const date = searchParams.get("date");
    const duration = searchParams.get("duration");
    const location = searchParams.get("location");
    const time = searchParams.get("time");
    const driver = searchParams.get("driver");

    useQueryStore.setDefaultValues({
        date: date ?? new Date(new Date().setHours(0, 0, 0, 0)).getTime().toString(),
        duration: duration ?? "1",
        location: location ?? "3276",
        time: time ?? "6",
        driver: driver === "true"
    });

    if (isSearchPage) {
        return (
            <section className="sticky top-[96px] z-10 flex w-full items-center rounded-xl border bg-background px-4 py-2 shadow">
                <IoSearch size={20} />
                <LocationDialog isSearchPage={isSearchPage} />
                •
                <DateDialog isSearchPage={isSearchPage} />
                •
                <TimeDialog isSearchPage={isSearchPage} />
                •
                <DurationDialog isSearchPage={isSearchPage} />
                •
                <DriverDialog isSearchPage={isSearchPage} />
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
                    <LocationDialog isSearchPage={isSearchPage} />
                    <div className="flex w-full gap-2">
                        <DateDialog className="flex-grow" />
                        <TimeDialog />
                        <DurationDialog />
                    </div>
                    <DriverDialog />
                </div>
            </CardContent>
            <CardFooter>
                <SearchButton />
            </CardFooter>
        </Card>
    );
}
