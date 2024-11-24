import { Prisma } from "@prisma/client";
import { createQuery } from "floppy-disk";

type props = { inputDebouncedValue?: string };
type returnType = Prisma.kabukotaGetPayload<{ include: { provinsi: true } }>[];

export const useWilayahQuery = createQuery<props, returnType>(async ({ inputDebouncedValue }) => {
    const res = await fetch(
        `/api/wilayah${inputDebouncedValue?.length ? `?query=${inputDebouncedValue}` : ""}`
    );
    if (!res.ok) throw new Error("Failed to fetch data");
    return res.json();
});
