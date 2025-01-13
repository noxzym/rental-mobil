"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useQueryStore } from "@/hooks/floppy-disk/use-queryStore";
import { Button } from "@/components/ui/button";

export default function SearchButton() {
    const pathName = usePathname();
    const { date, duration, location, time } = useQueryStore();

    const isHomePage = pathName === "/";

    return (
        <Button
            className={
                isHomePage
                    ? "w-full bg-[#1877F2] text-background hover:bg-[rgba(11,95,204)]"
                    : "h-fit w-fit rounded-lg bg-[rgba(11,95,204,.1)] py-1 text-[#1877F2] hover:bg-[rgba(11,95,204,.2)]"
            }
            asChild
        >
            <Link
                href={{
                    pathname: "/search",
                    query: {
                        date: date,
                        duration: duration,
                        location: location,
                        time: time
                    }
                }}
            >
                Ayo cari
            </Link>
        </Button>
    );
}
