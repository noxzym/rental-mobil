import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "./ui/skeleton";

type props = HTMLAttributes<HTMLDivElement> & { count?: number };

export default function DynamicLoader({ count, className }: props) {
    return Array.from(
        {
            length: count ?? 1
        },
        (_, i) => <Skeleton key={i} className={cn(className)} />
    );
}
