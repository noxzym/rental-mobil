"use client";

import { usePathname } from "next/navigation";
import { createUser, findUser } from "@/app/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { MdKey, MdMail } from "react-icons/md";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { CustomInput } from "./CustomInput";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";

const signUpFormSchema = z
    .object({
        email: z.string().email({ message: "Please enter a valid email address." }),
        password: z.string().min(8, { message: "Password must be at least 8 characters." }),
        confirm: z.string().min(8, { message: "Password must be at least 8 characters." })
    })
    .refine(data => data.password === data.confirm, {
        message: "Password don't match.",
        path: ["confirm"]
    });

export default function EmailForm() {
    const pathname = usePathname();
    const form = useForm<z.infer<typeof signUpFormSchema>>({
        resolver: zodResolver(signUpFormSchema),
        defaultValues: {
            email: "",
            password: "",
            confirm: ""
        }
    });

    const isLoginPage = pathname === "/sign-in";
    const emailState = form.getFieldState("email");
    const passwordState = form.getFieldState("password");

    if (isLoginPage && !passwordState.invalid && passwordState.isDirty) {
        form.setValue("confirm", form.getValues("password"));
    }

    async function onSubmit(data: z.infer<typeof signUpFormSchema>) {
        const loginOD = {
            email: "",
            password: ""
        };

        if (!isLoginPage) {
            const user = await createUser(data);

            if ("error" in user) {
                return toast({
                    title: "Something went wrong",
                    description: <p>{user.error}</p>
                });
            }

            loginOD.email = user.email;
            loginOD.password = data.password;
        } else {
            const user = await findUser(data);

            if (!user) {
                return toast({
                    title: "Something went wrong",
                    description: <p>Cannot find user with this email.</p>
                });
            }

            loginOD.email = user.email;
            loginOD.password = data.password;
        }

        await signIn("credentials", {
            callbackUrl: "/dashboard/user",
            ...loginOD
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <CustomInput
                                        icon={<MdMail className="text-foreground/30" />}
                                        placeholder="Email"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {!emailState.invalid && emailState.isDirty && (
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <CustomInput
                                            icon={<MdKey className="text-foreground/30" />}
                                            type="password"
                                            placeholder="Password"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )}
                    {!emailState.invalid && emailState.isDirty && !isLoginPage && (
                        <FormField
                            control={form.control}
                            name="confirm"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <CustomInput
                                            icon={<MdKey className="text-foreground/30" />}
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
                <Button type="submit" className="w-full rounded-xl bg-[#1877F2] hover:bg-[#0b5fcc]">
                    Daftar
                </Button>
            </form>
        </Form>
    );
}
