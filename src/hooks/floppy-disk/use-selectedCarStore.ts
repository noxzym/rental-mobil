import { createStore } from "floppy-disk";
import { Prisma } from "@prisma/client";

type Mobil = Prisma.mobilGetPayload<{}>;

type SelectedCarStore = {
    selectedCar: Mobil | null;
    setSelectedCar: (car: Mobil | null) => void;
};

// Create the store
export const selectedCarStore = createStore<SelectedCarStore>(({set}) => ({
    selectedCar: null,
    setSelectedCar: (car) => set({ selectedCar: car }),
}));

// Hook to use the store state and actions
export const useSelectedCarStore = () => {
    const store = selectedCarStore.get();
    return store;
};