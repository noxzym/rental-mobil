import { createStore } from "floppy-disk";

type queryStore = {
    date: string;
    duration: string;
    location: string | null;
    time: string;
};

export const useQueryStore = createStore<queryStore>(({ set }) => ({
    date: Date.now().toString(),
    duration: "1",
    location: "3276",
    time: ""
}));
