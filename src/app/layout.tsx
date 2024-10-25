import { Viewport } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={cn(inter.className, "bg-background text-foreground")}>
                <main>{children}</main>
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
