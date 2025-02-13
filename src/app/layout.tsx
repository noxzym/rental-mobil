import { Viewport } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import SessionProvider from "@/components/SessionProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="scroll-smooth">
            <body className={inter.className}>
                <SessionProvider>
                    <main className="mx-auto grid min-h-dvh grid-rows-[auto,1fr,auto]">
                        {children}
                    </main>
                    <Toaster />
                </SessionProvider>
            </body>
        </html>
    );
}

export const viewport: Viewport = {
    colorScheme: "light",
    themeColor: [{ media: "(prefers-color-scheme: light)", color: "white" }],
    width: "device-width",
    initialScale: 1
};
