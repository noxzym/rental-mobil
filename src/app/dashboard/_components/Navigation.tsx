"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type props = {
    routes: {
        title: string;
        icon: JSX.Element;
        href: string;
    }[];
};

export default function Navigation({ routes }: props) {
    const pathname = usePathname();

    return (
        <nav className="flex flex-col gap-2">
            {routes.map((item, index) => (
                <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    className={cn("justify-start", pathname === item.href && "bg-accent")}
                    asChild
                >
                    <Link href={item.href}>
                        {item.icon}
                        <p>{item.title}</p>
                    </Link>
                </Button>
            ))}
        </nav>
    );
}
