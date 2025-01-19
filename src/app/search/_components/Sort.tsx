"use client";

import { ArrowDownAZ, ArrowUpAZ } from "lucide-react";
import { cn } from "@/lib/utils";
import { filterStoreType, useFilterStore } from "@/hooks/floppy-disk/use-filterStore";
import { Button } from "@/components/ui/button";

export default function Sort() {
    const filterStore = useFilterStore();
    const filterKey: filterStoreType["sortBy"][] = ["harga", "model", "tahun"];

    return (
        <section className="flex items-center rounded-xl border bg-background px-4 py-2 shadow">
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
                        "h-8 justify-between px-2 capitalize",
                        filterStore.sortBy === item.toLowerCase() && "bg-accent"
                    )}
                >
                    <p>{item}</p>
                    {filterStore.sortBy === item.toLowerCase() &&
                        (filterStore.orderBy === "asc" ? (
                            <ArrowDownAZ size={16} className="ml-1" />
                        ) : (
                            <ArrowUpAZ size={16} className="ml-1" />
                        ))}
                </Button>
            ))}
        </section>
    );
}
