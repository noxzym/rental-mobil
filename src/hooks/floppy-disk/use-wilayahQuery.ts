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

const baseURI = `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/wilayah`;

export const useWilayahQuery = createQuery<wilayahQueryPropsType, wilayahQueryReturnType>(
    async ({ endpoint = "/", query, parent }) => {
        const url = new URL(baseURI + endpoint);

        if (query?.length) {
            url.searchParams.set("query", query);
        }

        if (parent?.length) {
            url.searchParams.set("parent", parent);
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
