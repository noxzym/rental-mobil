import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { TbHeartHandshake } from "react-icons/tb";
import Logo from "./Logo";
import { Button } from "./ui/button";

export default function Navigation() {
    return (
        <nav className="container sticky top-0 z-10 flex items-center justify-between bg-background px-20 py-5">
            <Link href="/" className="[&_svg]:h-auto [&_svg]:w-20">
                <Logo />
            </Link>
            <div className="flex items-center gap-5">
                <Button variant="link" className="px-0 py-0" asChild>
                    <Link href="#">
                        <TbHeartHandshake /> Jadi Partner Kami
                    </Link>
                </Button>
                <Button
                    size="sm"
                    className="bg-[rgba(11,95,204,.1)] text-[#1877F2] hover:bg-[rgba(11,95,204,.2)]"
                    asChild
                >
                    <Link href="/sign-in">
                        <FaUser /> Daftar / Masuk
                    </Link>
                </Button>
            </div>
        </nav>
    );
}
