import Link from "next/link";
import { MdLock, MdLogin, MdMail } from "react-icons/md";
import { Button } from "@/components/ui/button";
import SignInProviderButton from "@/components/SignInProviderButton";
import TextFormInput from "@/components/TextFormInput";

export default function LoginPage() {
    return (
        <section className="container mx-auto flex min-h-screen items-center justify-center">
            <div className="flex max-w-sm items-center rounded-3xl bg-background px-7 py-10 shadow ring-1 ring-foreground/5">
                <div className="flex flex-col gap-20">
                    <div className="flex flex-col gap-5">
                        <span className="w-fit self-center rounded-xl bg-background p-3 shadow ring-1 ring-foreground/5">
                            <MdLogin size={28} />
                        </span>
                        <div className="flex flex-col gap-1 text-center">
                            <p className="text-xl font-semibold">Welcome Back</p>
                            <p className="text-balance text-xs text-foreground/50">
                                Find car that fit your style and budget with ease and convenience
                            </p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <TextFormInput
                                icon={<MdMail className="text-foreground/30" />}
                                type="email"
                                placeholder="Email"
                            />
                            <TextFormInput
                                icon={<MdLock className="text-foreground/30" />}
                                type="password"
                                placeholder="Password"
                            />
                            <Link href="#" className="w-fit text-sm font-medium text-foreground/80">
                                Forgot password?
                            </Link>
                        </div>
                        <Button className="w-full rounded-xl" asChild>
                            <Link href="#">Sign In</Link>
                        </Button>
                        <div className="flex items-center">
                            <hr className="flex-1 border-foreground/20" />
                            <p className="mx-2 text-foreground/60">or</p>
                            <hr className="flex-1 border-foreground/20" />
                        </div>
                        <div className="grid w-full grid-cols-3 gap-2">
                            <SignInProviderButton provider="Google" />
                            <SignInProviderButton provider="Facebook" />
                            <SignInProviderButton provider="Apple" />
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-5">
                        <p className="">Don&apos;t have an account?</p>
                        <Button variant="outline" className="w-2/3 rounded-xl" asChild>
                            <Link href="#">Sign Up</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
