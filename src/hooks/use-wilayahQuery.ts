import { Prisma } from "@prisma/client";
import { createQuery } from "floppy-disk";

type props = { wilayahQuery: string };
type returnType = Prisma.kabukotaGetPayload<{
    include: { provinsi: { select: { nama: true } } };
}>[];

export const useWilayahQuery = createQuery<props, returnType>(
    async ({ wilayahQuery }) => {
        const res = await fetch(
            `/api/wilayah${wilayahQuery?.length ? `?query=${wilayahQuery}` : ""}`
        );
        if (!res.ok) throw res;
        return res.json();
    },
    {
        fetchOnWindowFocus: false
    }
);
