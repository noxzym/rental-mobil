"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { FaUser } from "react-icons/fa";
import { Button } from "./ui/button";

export default function AuthButton() {
    const pathName = usePathname();
    const { status } = useSession();

    const isAuthorized = status === "authenticated";
    const isHomePage = pathName === "/";

    return (
        <Button
            size={isHomePage ? "default" : "sm"}
            variant={isHomePage ? "secondary" : "default"}
            onClick={() => isAuthorized && signOut()}
            className={
                !isHomePage
                    ? "bg-[rgba(11,95,204,.1)] text-[#1877F2] hover:bg-[rgba(11,95,204,.2)]"
                    : ""
            }
            asChild={!isAuthorized}
        >
            {isAuthorized ? (
                <>
                    <FaUser /> Keluar
                </>
            ) : (
                <Link href="/auth">
                    <FaUser />
                    Daftar / Masuk
                </Link>
            )}
        </Button>
    );
}
