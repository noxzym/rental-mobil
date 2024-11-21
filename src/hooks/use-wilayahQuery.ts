import { Prisma } from "@prisma/client";
import { createQuery } from "floppy-disk";

interface prop {
    inputDebouncedValue?: string;
}

export function useWilayahQuery({ inputDebouncedValue }: prop) {
    return createQuery<
        { inputDebouncedValue?: string },
        Prisma.kabukotaGetPayload<{ include: { provinsi: true } }>[]
    >(async () => {
        const res = await fetch(
            `/api/wilayah${inputDebouncedValue?.length ? `?query=${inputDebouncedValue}` : ""}`
        );
        if (!res.ok) throw new Error("Failed to fetch data");
        return res.json();
    })({ inputDebouncedValue });
}
