"use client";

import { FormEvent, useRef } from "react";
import { MdMail } from "react-icons/md";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ValidateEmail = z.string().email({
    message: "Plase enter a valid email address."
});

export default function EmailForm() {
    const ref = useRef<HTMLInputElement>(null);
    const { toast } = useToast();

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!ref.current) return;

        const { data, error, success } = ValidateEmail.safeParse(ref.current.value);
        if (!success) {
            return toast({
                variant: "destructive",
                title: "Invalid email",
                description: error?.issues[0]?.message
            });
        }
    }

    return (
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
            <Button type="submit" className="w-full rounded-xl bg-[#1877F2] hover:bg-[#0b5fcc]">
                Daftar
            </Button>
        </form>
    );
}
