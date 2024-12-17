import { Suspense } from "react";
import Link from "next/link";
import { TbHeartHandshake } from "react-icons/tb";
import { Button } from "@/components/ui/button";
import AuthButton from "@/components/AuthButton";
import BrandLogo from "@/components/Logo";
import SearchSection from "@/components/SearchSection";

export default async function HomePage() {
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
                    <AuthButton />
                </div>
            </nav>
            <div className="absolute bottom-10 left-20 right-20">
                <div className="flex w-full items-end justify-between">
                    <div className="mb-5 text-4xl font-semibold text-white">
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
