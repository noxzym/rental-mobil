"use client";

import { FormEvent, useRef } from "react";
import Link from "next/link";
import { MdLogin, MdMail } from "react-icons/md";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SignInProviderButton from "@/components/SignInProviderButton";

const ValidateEmail = z.string().email({
    message: "Enter a valid email address."
});

export default function SignInPage() {
    const ref = useRef<HTMLInputElement>(null);

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!ref.current) return;

        const { data, error, success } = ValidateEmail.safeParse(ref.current.value);
        if (!success) return;

        console.log(data);
    }

    return (
        <section className="container mx-auto flex min-h-screen items-center justify-center">
            <div className="flex w-full max-w-sm flex-col items-center gap-5 rounded-3xl px-7 py-10 shadow ring-1 ring-foreground/5">
                <span className="w-fit self-center rounded-xl bg-background p-3 shadow ring-1 ring-foreground/5">
                    <MdLogin size={28} />
                </span>
                <p className="text-xl font-semibold">Selamat Datang</p>
                <form
                    onSubmit={handleSubmit}
                    className="flex w-full flex-col items-center justify-center gap-5"
                >
                    <Input
                        ref={ref}
                        icon={<MdMail className="text-foreground/30" />}
                        type="email"
                        placeholder="Email"
                        className="w-full"
                    />
                    <Button
                        type="submit"
                        className="w-full rounded-xl bg-[#1877F2] hover:bg-[#0b5fcc]"
                    >
                        Masuk
                    </Button>
                </form>
                <div className="flex w-full items-center">
                    <hr className="flex-1 border-foreground/20" />
                    <p className="mx-2 text-foreground/60">atau</p>
                    <hr className="flex-1 border-foreground/20" />
                </div>
                <div className="grid w-full grid-cols-3 gap-2">
                    <SignInProviderButton provider="Google" />
                    <SignInProviderButton provider="Facebook" />
                    <SignInProviderButton provider="Apple" />
                </div>
                <div className="flex items-center justify-center gap-1 pt-4">
                    <p>Belum punya akun?</p>
                    <Button
                        variant="link"
                        className="h-fit px-0 py-0 font-bold text-[#1877F2]"
                        asChild
                    >
                        <Link href="/sign-up">Daftar yuk!</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
