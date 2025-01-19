"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, LockKeyhole, Mail, User } from "lucide-react";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { createAccount, findAccountByUnique } from "@/lib/actions";
import { formSchema, formSchemaType } from "@/lib/schemas";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { CustomInput } from "@/components/CustomInput";

type props = {
    action: "login" | "register";
};

export default function AuthForm({ action }: props) {
    const router = useRouter();
    const form = useForm<formSchemaType>({
        resolver: zodResolver(formSchema),
        mode: "onChange"
    });

    const { isSubmitting } = form.formState;

    useEffect(() => {
        if (action === "login") {
            form.resetField("nama");
            form.resetField("confirm");
        }
    }, [action, form]);

    async function onSubmit(data: formSchemaType) {
        if (action === "register") {
            const newUser = await createAccount({ data });
            if ("error" in newUser) {
                toast({
                    title: "Gagal mendaftar!",
                    description: newUser.error
                });
                return;
            }
        }

        const userDB = await findAccountByUnique({ where: { email: data.email } });
        if (!userDB) {
            toast({
                title: "Gagal masuk!",
                description: "Email tidak terdaftar!"
            });
            return;
        }

        const response = await signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: false
        });

        if (!response?.ok) {
            toast({
                title: "Gagal masuk!",
                description: "Email atau password salah!"
            });
            return;
        }

        toast({
            title: "Berhasil masuk!",
            description: `Selamat datang ${action === "register" ? "di Rent.Id" : "kembali"}!`
        });

        router.push("/dashboard");
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col gap-4">
                <div className="flex flex-col gap-2">
                    {action === "register" && (
                        <FormField
                            control={form.control}
                            name="nama"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <CustomInput
                                            icon={<User className="size-4 text-foreground/30" />}
                                            placeholder="Nama"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )}
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <CustomInput
                                        icon={<Mail className="size-4 text-foreground/30" />}
                                        placeholder="Email"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <CustomInput
                                        icon={<Lock className="size-4 text-foreground/30" />}
                                        type="password"
                                        placeholder="Password"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {action === "register" && (
                        <FormField
                            control={form.control}
                            name="confirm"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <CustomInput
                                            icon={
                                                <LockKeyhole className="size-4 text-foreground/30" />
                                            }
                                            type="password"
                                            placeholder="Confirm Password"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )}
                </div>
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-xl bg-[#1877F2] hover:bg-[#0b5fcc]"
                >
                    {action === "login" ? "Masuk" : "Daftar"}
                </Button>
            </form>
        </Form>
    );
}
