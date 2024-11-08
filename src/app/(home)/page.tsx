"use client";

import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { TbHeartHandshake } from "react-icons/tb";
import { Button } from "@/components/ui/button";
import BrandLogo from "@/components/Logo";
import SearchCard from "./_components/SearchCard";

export default function Home() {
    return (
        <section className="relative h-dvh min-h-[600px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops)),url('/assets/car-driver.jpg')] from-black/20 to-black/50 bg-cover bg-center bg-no-repeat">
            <nav className="absolute left-20 right-20 top-10 mx-auto flex items-center justify-between">
                <Link href="#" className="[&_svg]:h-auto [&_svg]:w-32">
                    <BrandLogo textColor="#FFFFFF" dotColor="#FFB534" />
                </Link>
                <div className="flex gap-4">
                    <Button variant="secondary" asChild>
                        <Link href="#">
                            <TbHeartHandshake /> Jadi Partner Kami
                        </Link>
                    </Button>
                    <Button variant="secondary" asChild>
                        <Link href="/sign-in">
                            <FaUser /> Daftar / Masuk
                        </Link>
                    </Button>
                </div>
            </nav>
            <div className="absolute bottom-10 left-20 right-20">
                <div className="flex w-full items-end justify-between">
                    <div className="mb-5 text-4xl font-semibold text-white">
                        Temukan Kenyamanan
                        <br /> Dalam Perjalanan Anda
                    </div>
                    <SearchCard />
                </div>
            </div>
        </section>
    );
}
