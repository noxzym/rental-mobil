"use client";

import { filterStoreType, useFilterStore } from "@/hooks/floppy-disk/use-filterStore";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function Aside() {
    function handlefilterChange(
        sortBy: filterStoreType["sortBy"],
        orderBy: filterStoreType["orderBy"]
    ) {
        useFilterStore.set({ orderBy, sortBy });
    }

    return (
        <aside className="sticky top-[162px] flex h-fit w-full flex-col gap-3 rounded-xl bg-background px-4 py-2 shadow">
            <h3 className="text-lg font-semibold">Sort By</h3>
            <RadioGroup defaultValue="harga-asc">
                <div className="flex items-center space-x-2">
                    <RadioGroupItem
                        value="harga-asc"
                        id="harga-asc"
                        onClick={() => handlefilterChange("harga", "asc")}
                    />
                    <Label htmlFor="harga-asc">Harga: Rendah ke Tinggi</Label>
                </div>

                <div className="flex items-center space-x-2">
                    <RadioGroupItem
                        value="harga-desc"
                        id="harga-desc"
                        onClick={() => handlefilterChange("harga", "desc")}
                    />
                    <Label htmlFor="harga-desc">Harga: Tinggi ke Rendah</Label>
                </div>

                <div className="flex items-center space-x-2">
                    <RadioGroupItem
                        value="tahun-desc"
                        id="tahun-desc"
                        onClick={() => handlefilterChange("tahun", "desc")}
                    />
                    <Label htmlFor="tahun-desc">Tahun: Terbaru</Label>
                </div>

                <div className="flex items-center space-x-2">
                    <RadioGroupItem
                        value="tahun-asc"
                        id="tahun-asc"
                        onClick={() => handlefilterChange("tahun", "asc")}
                    />
                    <Label htmlFor="tahun-asc">Tahun: Terlama</Label>
                </div>

                <div className="flex items-center space-x-2">
                    <RadioGroupItem
                        value="model-asc"
                        id="model-asc"
                        onClick={() => handlefilterChange("model", "asc")}
                    />
                    <Label htmlFor="model-asc">Model: A-Z</Label>
                </div>

                <div className="flex items-center space-x-2">
                    <RadioGroupItem
                        value="model-desc"
                        id="model-desc"
                        onClick={() => handlefilterChange("model", "desc")}
                    />
                    <Label htmlFor="model-desc">Model: Z-A</Label>
                </div>
            </RadioGroup>
        </aside>
    );
}
