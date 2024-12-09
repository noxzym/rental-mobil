"use client";

import { SessionProvider as NextSessionProvider } from "next-auth/react";

interface prop {
    children: React.ReactNode;
}

export default function SessionProvider({ children }: prop) {
    return <NextSessionProvider>{children}</NextSessionProvider>;
}
