import Link from "next/link";
import { redirect } from "next/navigation";
import { MdLogin } from "react-icons/md";
import { auth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import ButtonProvider from "@/components/ButtonProvider";
import EmailForm from "@/components/EmailForm";

export default async function SignUpPage() {
    const session = await auth();

    if (session) redirect("/");

    return (
        <section className="container mx-auto flex min-h-screen items-center justify-center">
            <div className="flex w-full max-w-sm flex-col items-center gap-5 rounded-3xl px-7 py-10 shadow ring-1 ring-foreground/5">
                <span className="w-fit self-center rounded-xl bg-background p-3 shadow ring-1 ring-foreground/5">
                    <MdLogin size={28} />
                </span>
                <p className="text-xl font-semibold">Selamat Datang</p>
                <EmailForm />
                <div className="flex w-full items-center">
                    <hr className="flex-1 border-foreground/20" />
                </div>
                <div className="grid w-full grid-cols-3 gap-2">
                    <ButtonProvider provider="Google" />
                    <ButtonProvider provider="Facebook" />
                    <ButtonProvider provider="Apple" />
                </div>
                <div className="flex items-center justify-center gap-1 pt-4">
                    <p>Sudah punya akun?</p>
                    <Button
                        variant="link"
                        className="h-fit px-0 py-0 font-bold text-[#1877F2]"
                        asChild
                    >
                        <Link href="/sign-in">Login aja!</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
