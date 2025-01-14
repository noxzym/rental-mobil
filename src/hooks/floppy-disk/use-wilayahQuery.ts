import { Prisma } from "@prisma/client";
import { createQuery } from "floppy-disk";

export type wilayahQueryPropsType = {
    endpoint?: "/" | "/provinsi" | "/kabukota" | "/kecamatan" | "/kelurahan";
    query?: string;
    parent?: string;
};

type wilayahQueryReturnType =
    | Prisma.kabukotaGetPayload<{
          include: { provinsi: { select: { nama: true } } };
      }>[]
    | Prisma.kelurahanGetPayload<{}>[]
    | Prisma.kecamatanGetPayload<{}>[]
    | Prisma.kabukotaGetPayload<{}>[]
    | Prisma.provinsiGetPayload<{}>[];

export const useWilayahQuery = createQuery<wilayahQueryPropsType, wilayahQueryReturnType>(
    async ({ endpoint = "/", query, parent }) => {
        const url = `/api/wilayah${endpoint}`;

        if (query?.length) {
            url.concat(`?query=${query}`);
        }

        if (parent?.length) {
            url.concat(`?parent=${parent}`);
        }

        const res = await fetch(url);
        if (!res.ok) throw res;

        return res.json();
    },
    {
        fetchOnWindowFocus: false
    }
);

export function isSearchCase(
    wilayah: wilayahQueryReturnType
): wilayah is Prisma.kabukotaGetPayload<{
    include: { provinsi: { select: { nama: true } } };
}>[] {
    return Array.isArray(wilayah) && "provinsi" in wilayah[0];
}
