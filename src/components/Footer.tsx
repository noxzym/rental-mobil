import Link from "next/link";
import { IoChevronUp } from "react-icons/io5";
import Logo from "./Logo";

export default function Footer() {
    return (
        <footer className="bg-foreground px-4 pt-6 text-background md:px-20 md:pt-16">
            <div className="container flex flex-col justify-between gap-5 px-0 md:flex-row">
                <section>
                    <Logo textColor="#FFFFFF" dotColor="#FFB534" />
                    <p className="max-w-sm pt-4">
                        Rent.Id - Find car that fit your style and budget with ease and convenience
                    </p>
                </section>
                <section className="grid auto-cols-max items-start gap-8 md:grid-cols-3">
                    <div className="flex flex-col justify-center gap-3 md:gap-6">
                        <p className="text-xl font-bold">Navigation</p>
                        <div className="grid gap-2">
                            <Link href="/home">Home</Link>
                            <Link href="/search">Search</Link>
                            <Link href="/dashboard">Dashboard</Link>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center gap-3 md:gap-6">
                        <p className="text-xl font-bold">Legal</p>
                        <div className="grid gap-2">
                            <Link href="/privacy-policy">Privacy Policy</Link>
                            <Link href="/terms-of-service">Terms of Service</Link>
                            <Link href="/refund-policy">Refund Policy</Link>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center gap-3 md:gap-6">
                        <p className="text-xl font-bold">Support</p>
                        <div className="grid gap-2">
                            <Link href="#">FAQ</Link>
                            <Link href="#">Email</Link>
                            <Link href="#">Whatsapp</Link>
                        </div>
                    </div>
                </section>
            </div>
            <div className="container mt-12 flex flex-col justify-between gap-5 border-t-1 border-background/80 px-0 py-6 md:flex-row md:items-center">
                <p className="text-xs font-medium md:text-center">
                    Copyright &copy; 2024 Rent.Id. All rights reserved.
                </p>
                <a href="#" className="font-bold hover:text-background/80">
                    Scroll to Top <IoChevronUp className="ml-1 inline" />
                </a>
            </div>
        </footer>
    );
}
