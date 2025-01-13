import { Prisma } from "@prisma/client";
import { createQuery } from "floppy-disk";
import { filterStoreType } from "./use-filterStore";

type props = filterStoreType & { available: boolean };
type returnType = Prisma.mobilGetPayload<{}>[];

export const useCarQuery = createQuery<props, returnType>(
    async ({ orderBy, sortBy, available }) => {
        const res = await fetch(
            `/api/cars?sortBy=${sortBy}&orderBy=${orderBy}&available=${available}`
        );
        if (!res.ok) throw res;

        return res.json();
    },
    {
        fetchOnWindowFocus: false
    }
);
