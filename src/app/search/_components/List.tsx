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
                // <div
                //     key={car.id}
                //     className="flex w-full items-center justify-between rounded-xl bg-background px-4 py-5 shadow"
                // >
                //     <div className="flex">
                //         <span className="relative aspect-video h-auto w-40 rounded-lg">
                //             {car.gambar ? (
                //                 <Image src={car.gambar} alt={`${car.merek} ${car.model}`} fill />
                //             ) : (
                //                 <div className="h-full w-full bg-gray-200" />
                //             )}
                //         </span>
                //         <div className="ml-5 flex flex-col text-sm">
                //             <p className="font-bold">
                //                 {car.merek} {car.model}
                //             </p>
                //             <p>{car.tahun}</p>
                //             <p>{car.warna}</p>
                //         </div>
                //     </div>
                //     <div className="flex self-end">
                //         <div className="flex">
                //             <p className="text-2xl font-bold">
                //                 IDR {car.harga.toLocaleString("id-ID")}
                //             </p>
                //             <p className="self-end text-sm"> / hari</p>
                //         </div>
                //     </div>
                // </div>
            ))}
        </section>
    );
}
