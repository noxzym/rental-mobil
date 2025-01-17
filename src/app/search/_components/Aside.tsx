"use client";

import { ArrowDownAZ, ArrowUpAZ } from "lucide-react";
import { cn } from "@/lib/utils";
import { filterStoreType, useFilterStore } from "@/hooks/floppy-disk/use-filterStore";
import { Button } from "@/components/ui/button";

export default function Aside() {
    const filterStore = useFilterStore();
    const filterKey: filterStoreType["sortBy"][] = ["harga", "model", "tahun"];

    return (
        <aside className="sticky top-[162px] flex h-fit w-full flex-col gap-3 rounded-xl bg-background px-4 py-5 shadow">
            <p className="text-center text-xl font-semibold">Urut Berdasarkan</p>
            <div className="flex flex-col gap-2">
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
                            "justify-between capitalize",
                            filterStore.sortBy === item.toLowerCase() && "bg-accent"
                        )}
                    >
                        <p>{item}</p>{" "}
                        {filterStore.orderBy === "asc" ? (
                            <ArrowDownAZ
                                size={16}
                                className={
                                    filterStore.sortBy === item.toLowerCase() ? "block" : "hidden"
                                }
                            />
                        ) : (
                            <ArrowUpAZ
                                size={16}
                                className={
                                    filterStore.sortBy === item.toLowerCase() ? "block" : "hidden"
                                }
                            />
                        )}
                    </Button>
                ))}
            </div>
        </aside>
    );
}
