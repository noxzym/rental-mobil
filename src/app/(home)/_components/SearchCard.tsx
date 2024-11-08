"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import DurationDialog from "@/components/dialog/DurationDialog";
import LocationDialog from "@/components/dialog/LocationDialog";
import ScheduleDialog from "@/components/dialog/ScheduleDialog";
import TimeDialog from "@/components/dialog/TimeDialog";

export default function SearchCard() {
    const searchParams = useSearchParams().toString();

    return (
        <Card className="w-2/5 rounded-xl p-2">
            <CardHeader>
                <CardTitle>Tentukan Jadwalmu</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid w-full items-center gap-4">
                    <LocationDialog searchParams={searchParams} />
                    <div className="flex w-full gap-2">
                        <ScheduleDialog className="flex-grow" searchParams={searchParams} />
                        <TimeDialog searchParams={searchParams} />
                    </div>
                    <DurationDialog searchParams={searchParams} />
                </div>
            </CardContent>
            <CardFooter>
                <Button
                    className="w-full bg-[#1877F2] text-background hover:bg-[rgba(11,95,204)]"
                    asChild
                >
                    <Link href={`/search${searchParams.length ? `?${searchParams}` : ""}`}>
                        Ayo cari
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
}
