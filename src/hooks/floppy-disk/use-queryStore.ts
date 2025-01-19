import { createStore } from "floppy-disk";

type queryStore = {
    date: string;
    duration: string;
    location: string | null;
    time: string;
    driver: boolean;
};

export const useQueryStore = createStore<queryStore>(({ set }) => ({
    date: new Date(new Date().setHours(0, 0, 0, 0)).getTime().toString(),
    duration: "1",
    location: "3276",
    time: "",
    driver: false
}));
