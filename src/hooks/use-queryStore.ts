import { createStore } from "floppy-disk";

type queryStore = {
    dateStored: string;
    durationStored: string;
    locationStored: string;
    timestored: string;
    storeDateState: (dateStored: string) => void;
    storeDurationState: (durationStored: string) => void;
    storeLocationState: (locationStored: string) => void;
    storeTimeState: (timestored: string) => void;
};

export const useQueryStore = createStore<queryStore>(({ set }) => ({
    dateStored: Date.now().toString(),
    durationStored: "1",
    locationStored: "3276",
    timestored: "",
    storeDateState: (dateStored: string) => set({ dateStored }),
    storeDurationState: (durationStored: string) => set({ durationStored }),
    storeLocationState: (locationStored: string) => set({ locationStored }),
    storeTimeState: (timestored: string) => set({ timestored })
}));
