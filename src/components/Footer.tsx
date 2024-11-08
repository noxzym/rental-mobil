import Link from "next/link";
import { IoChevronUp } from "react-icons/io5";
import Logo from "./Logo";

export default function Footer() {
    return (
        <footer className="bg-[#1877F2] px-20 pt-16 text-background">
            <div className="container flex justify-between px-0">
                <section>
                    <Logo textColor="#FFFFFF" dotColor="#FFB534" />
                    <p className="max-w-sm pt-4">
                        Rent.Id - Find car that fit your style and budget with ease and convenience
                    </p>
                </section>
                <section className="grid auto-cols-max grid-cols-3 items-start gap-8">
                    <div className="flex flex-col justify-center">
                        <p className="text-xl font-bold">Navigation</p>
                        <div className="grid gap-2 pt-6">
                            <Link href="/home">Home</Link>
                            <Link href="/search">Search</Link>
                            <Link href="#">About</Link>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center">
                        <p className="text-xl font-bold">Legal</p>
                        <div className="grid gap-2 pt-6">
                            <Link href="#">Privacy Policy</Link>
                            <Link href="#">Terms of Service</Link>
                            <Link href="#">Refund Policy</Link>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center">
                        <p className="text-xl font-bold">Support</p>
                        <div className="grid gap-2 pt-6">
                            <Link href="#">FAQ</Link>
                            <Link href="#">Email</Link>
                            <Link href="#">Whatsapp</Link>
                        </div>
                    </div>
                </section>
            </div>
            <div className="container mt-12 flex items-center justify-between border-t-1 border-background/80 px-0 py-6">
                <p className="text-center text-xs font-medium">
                    Copyright &copy; 2024 Rent.Id. All rights reserved.
                </p>
                <a href="#" className="font-bold hover:text-background/80">
                    Scroll to Top <IoChevronUp className="ml-1 inline" />
                </a>
            </div>
        </footer>
    );
}
