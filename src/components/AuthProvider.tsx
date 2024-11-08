"use client";

import { SessionProvider } from "next-auth/react";

interface prop {
    children: React.ReactNode;
}

export default function AuthProvider({ children }: prop) {
    return <SessionProvider>{children}</SessionProvider>;
}
