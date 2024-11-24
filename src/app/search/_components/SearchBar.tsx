"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { IoSearch } from "react-icons/io5";
import { useQueryStore } from "@/hooks/use-queryStore";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import DateDialog from "@/components/dialog/DateDialog";
import DurationDialog from "@/components/dialog/DurationDialog";
import LocationDialog from "@/components/dialog/LocationDialog";
import TimeDialog from "@/components/dialog/TimeDialog";

export default function SearchBar() {
    const searchParams = useSearchParams();
    const {
        dateStored,
        durationStored,
        locationStored,
        timestored,
        storeDateState,
        storeDurationState,
        storeLocationState,
        storeTimeState
    } = useQueryStore();

    const date = searchParams.get("date");
    const duration = searchParams.get("duration");
    const location = searchParams.get("location");
    const time = searchParams.get("time");

    if (date) {
        storeDateState(date);
    }

    if (duration) {
        storeDurationState(duration);
    }

    if (location) {
        storeLocationState(location);
    }

    if (time) {
        storeTimeState(time);
    }

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
            <Button
                className="h-fit w-fit rounded-lg bg-[rgba(11,95,204,.1)] py-1 text-[#1877F2] hover:bg-[rgba(11,95,204,.2)]"
                asChild
            >
                <Link
                    href={{
                        pathname: "/search",
                        query: {
                            date: dateStored,
                            duration: durationStored,
                            location: locationStored,
                            time: timestored
                        }
                    }}
                >
                    Ayo cari
                </Link>
            </Button>
        </section>
    );
}
