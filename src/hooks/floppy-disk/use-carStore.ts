import { Prisma, StatusMobil, Transmisi } from "@prisma/client";
import { createStore, createStores, withContext } from "floppy-disk";

type CarStoreKey = { id: string };

export type CarStoreType = Prisma.mobilGetPayload<{}> & {
    isEditing: boolean;
};

export const useCarStore = createStores<CarStoreKey, CarStoreType>({
    id: "",
    warna: "",
    merek: "",
    model: "",
    tahun: "",
    plat: "",
    transmisi: Transmisi.Manual,
    gambar: "",
    bangku: 0,
    harga: 0,
    status: StatusMobil.Ready,
    isEditing: false
});
