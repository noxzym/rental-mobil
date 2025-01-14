import { Suspense } from "react";
import Link from "next/link";
import { TbHeartHandshake } from "react-icons/tb";
import { Button } from "@/components/ui/button";
import AuthButton from "@/components/AuthButton";
import BrandLogo from "@/components/Logo";
import SearchSection from "@/components/SearchSection";

export default function JumbotronSection() {
    return (
        <section className="relative h-dvh min-h-[600px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops)),url('/assets/car-driver.jpg')] from-black/10 to-black/80 bg-cover bg-center bg-no-repeat">
            <nav className="absolute left-5 right-5 top-10 mx-auto flex items-center justify-between md:left-20 md:right-20">
                <Link href="#" className="[&_svg]:h-auto [&_svg]:w-24 md:[&_svg]:w-32">
                    <BrandLogo textColor="#FFFFFF" dotColor="#FFB534" />
                </Link>
                <div className="hidden gap-4 md:flex">
                    <Button variant="secondary" asChild>
                        <Link href="/dashboard">Buka Dashboard</Link>
                    </Button>
                    <AuthButton />
                </div>
            </nav>
            <div className="absolute bottom-5 left-5 right-5 md:bottom-10 md:left-20 md:right-20">
                <div className="flex w-full flex-col md:flex-row md:items-end md:justify-between">
                    <div className="mb-5 text-2xl font-semibold text-white md:text-4xl">
                        Temukan Kenyamanan
                        <br /> Dalam Perjalanan Anda
                    </div>
                    <Suspense>
                        <SearchSection />
                    </Suspense>
                </div>
            </div>
        </section>
    );
}
