"use client";

import { useState } from "react";
import { MdLogin } from "react-icons/md";
import { Button } from "@/components/ui/button";
import AuthForm from "./_components/AuthForm";
import GoogleProvider from "./_components/GoogleProvider";

export default function AuthPage() {
    const [state, setState] = useState<"login" | "register">("login");

    const question = state === "login" ? "Belum punya akun?" : "Sudah punya akun?";
    const CTA = state === "login" ? "Daftar yuk!" : "Login aja!";

    function onClick() {
        setState(prev => (prev === "login" ? "register" : "login"));
    }

    return (
        <section className="container mx-auto flex min-h-screen items-center justify-center">
            <div className="flex w-full max-w-sm flex-col items-center gap-5 rounded-3xl px-7 py-10 shadow ring-1 ring-foreground/5">
                <span className="w-fit self-center rounded-xl bg-background p-3 shadow ring-1 ring-foreground/5">
                    <MdLogin size={28} />
                </span>
                <p className="text-xl font-semibold">Selamat Datang</p>
                <AuthForm action={state} />
                <GoogleProvider />
                <div className="flex items-center justify-center gap-1 pt-4">
                    <p>{question}</p>
                    <Button
                        variant="link"
                        className="h-fit px-0 py-0 font-bold text-[#1877F2]"
                        onClick={onClick}
                    >
                        {CTA}
                    </Button>
                </div>
            </div>
        </section>
    );
}
