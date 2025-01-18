"use client";

import { useCarQuery } from "@/hooks/floppy-disk/use-carQuery";
import { useFilterStore } from "@/hooks/floppy-disk/use-filterStore";
import Car from "./Car";

export default function List() {
    const { data } = useCarQuery();
    const filterStore = useFilterStore();

    const cars = data?.sort((a, b) => {
        const orderByAsc = filterStore.orderBy === "asc";

        return filterStore.sortBy === "model"
            ? orderByAsc
                ? a.model.localeCompare(b.model)
                : b.model.localeCompare(a.model)
            : Number((orderByAsc ? a : b)[filterStore.sortBy]) -
                  Number((orderByAsc ? b : a)[filterStore.sortBy]);
    });

    return (
        <section className="col-span-3 grid w-full gap-3 rounded-xl bg-background px-4 py-5 shadow">
            {cars?.map(car => (
                <Car key={car.id} mobil={car} />
            ))}
        </section>
    );
}
