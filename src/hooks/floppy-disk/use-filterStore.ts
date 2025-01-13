import { createStore } from "floppy-disk";

export type filterStoreType = {
    sortBy: "harga" | "tahun" | "merek" | "model";
    orderBy: "asc" | "desc";
};

export const useFilterStore = createStore<filterStoreType>(() => ({
    sortBy: "harga",
    orderBy: "asc"
}));
