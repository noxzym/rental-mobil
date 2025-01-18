"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { IoSearch } from "react-icons/io5";
import { ArrowDownAZ, ArrowUpAZ } from "lucide-react";
import { useQueryStore } from "@/hooks/floppy-disk/use-queryStore";
import { filterStoreType, useFilterStore } from "@/hooks/floppy-disk/use-filterStore";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "./ui/separator";
import { cn } from "@/lib/utils";
import SearchButton from "@/components/SearchButton";
import DateDialog from "@/components/dialog/DateDialog";
import DurationDialog from "@/components/dialog/DurationDialog";
import LocationDialog from "@/components/dialog/LocationDialog";
import TimeDialog from "@/components/dialog/TimeDialog";

function SortingOptions() {
    const filterStore = useFilterStore();
    const filterKey: filterStoreType["sortBy"][] = ["harga", "model", "tahun"];

    return (
        <div className="flex items-center gap-2 px-4">
            <span className="text-sm font-medium">Urut:</span>
            {filterKey.map((item, index) => (
                <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                        useFilterStore.set({
                            sortBy: item,
                            orderBy: filterStore.orderBy === "asc" ? "desc" : "asc"
                        })
                    }
                    className={cn(
                        "h-8 px-2 justify-between capitalize",
                        filterStore.sortBy === item.toLowerCase() && "bg-accent"
                    )}
                >
                    <p>{item}</p>
                    {filterStore.sortBy === item.toLowerCase() && (
                        filterStore.orderBy === "asc" ? (
                            <ArrowDownAZ size={16} className="ml-1" />
                        ) : (
                            <ArrowUpAZ size={16} className="ml-1" />
                        )
                    )}
                </Button>
            ))}
        </div>
    );
}

export default function SearchSection() {
    const pathName = usePathname();
    const searchParams = useSearchParams();

    const isHomePage = pathName === "/";
    const isSearchPage = pathName === "/search";

    const date = searchParams.get("date");
    const duration = searchParams.get("duration");
    const location = searchParams.get("location");
    const time = searchParams.get("time");

    useQueryStore.setDefaultValues({
        date: date ?? (Date.now()-(Date.now()%86400000)).toString(),
        duration: duration ?? "1",
        location: location ?? "3276",
        time: time ?? "6"
    });

    if (isSearchPage) {
        return (
            <section className="z-10 flex w-full flex-col rounded-xl border bg-background p-4 shadow">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <IoSearch size={20} />
                        <LocationDialog />
                        <Separator orientation="vertical" className="h-10" />
                        <DateDialog />
                        •
                        <TimeDialog />
                        <Separator orientation="vertical" className="h-10" />
                        <DurationDialog />
                        <Separator orientation="vertical" className="h-10" />
                        <SortingOptions />
                    </div>
                    <SearchButton />
                </div>
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