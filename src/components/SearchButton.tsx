"use client";

import Link from "next/link";
import { useQueryStore } from "@/hooks/floppy-disk/use-queryStore";
import { Button } from "@/components/ui/button";

export default function SearchButton() {
    const { date, duration, location, time, driver } = useQueryStore();

    return (
        <Button className="w-full bg-[#1877F2] text-background hover:bg-[rgba(11,95,204)]" asChild>
            <Link
                href={{
                    pathname: "/search",
                    query: {
                        date,
                        duration,
                        location,
                        time,
                        driver
                    }
                }}
            >
                Ayo cari
            </Link>
        </Button>
    );
}
