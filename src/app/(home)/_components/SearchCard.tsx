"use client";

import Link from "next/link";
import { useQueryStore } from "@/hooks/use-queryStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import DateDialog from "@/components/dialog/DateDialog";
import DurationDialog from "@/components/dialog/DurationDialog";
import LocationDialog from "@/components/dialog/LocationDialog";
import TimeDialog from "@/components/dialog/TimeDialog";

export default function SearchCard() {
    const { dateStored, durationStored, locationStored, timestored } = useQueryStore();

    return (
        <Card className="w-2/5 rounded-xl p-2">
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
                <Button
                    className="w-full bg-[#1877F2] text-background hover:bg-[rgba(11,95,204)]"
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
            </CardFooter>
        </Card>
    );
}
