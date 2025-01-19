import Link from "next/link";
import { TbHeartHandshake } from "react-icons/tb";
import AuthButton from "./AuthButton";
import Logo from "./Logo";
import { Button } from "./ui/button";

export default function Navigation() {
    return (
        <nav className="container sticky top-0 z-20 flex items-center justify-between bg-background px-20 py-5">
            <Link href="/" className="[&_svg]:h-auto [&_svg]:w-20">
                <Logo />
            </Link>
            <div className="flex items-center gap-5">
                <Button variant="link" className="px-0 py-0" asChild>
                    <Link href="/">Halaman Utama</Link>
                </Button>
                <Button variant="link" className="px-0 py-0" asChild>
                    <Link href="/search">Cari Mobil</Link>
                </Button>
                <Button variant="link" className="px-0 py-0" asChild>
                    <Link href="/dashboard">Buka Dashboard</Link>
                </Button>
                <AuthButton />
            </div>
        </nav>
    );
}
