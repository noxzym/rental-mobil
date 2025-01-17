import { Prisma } from "@prisma/client";
import { createQuery } from "floppy-disk";
import { filterStoreType } from "./use-filterStore";

type returnType = Prisma.mobilGetPayload<{}>[];

export const useCarQuery = createQuery<undefined, returnType>(
    async () => {
        const res = await fetch(`/api/cars`);
        if (!res.ok) throw res;

        return res.json();
    },
    {
        fetchOnWindowFocus: false
    }
);
