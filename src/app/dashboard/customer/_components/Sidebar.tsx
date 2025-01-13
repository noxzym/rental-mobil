import Link from "next/link";
import { ClipboardList, MessageCircleMore, PencilLine, UserPen } from "lucide-react";
import Logo from "@/components/Logo";

interface SidebarProps {
    setActivePage: (page: string) => void;
}

export default function Sidebar({ setActivePage }: SidebarProps) {
    return (
        <div className="sticky top-[92px] h-fit w-full rounded-xl bg-white p-4">
            <Link href="/" className="[&_svg]:h-auto [&_svg]:w-20">
                <Logo />
            </Link>
            <nav className="space-y-2">
                <button
                    onClick={() => setActivePage("profile")}
                    className="flex w-full items-center gap-2 rounded p-2 text-left hover:bg-blue-50"
                >
                    <UserPen size={20} />
                    <span>Profile</span>
                </button>
                <button
                    onClick={() => setActivePage("orders")}
                    className="flex w-full items-center gap-2 rounded p-2 text-left hover:bg-blue-50"
                >
                    <ClipboardList size={20} />
                    <span>Orders</span>
                </button>
                <button
                    onClick={() => setActivePage("reviews")}
                    className="flex w-full items-center gap-2 rounded p-2 text-left hover:bg-blue-50"
                >
                    <PencilLine size={20} />
                    <span>Reviews</span>
                </button>
                <button
                    onClick={() => setActivePage("chat")}
                    className="flex w-full items-center gap-2 rounded p-2 text-left hover:bg-blue-50"
                >
                    <MessageCircleMore size={20} />
                    <span>Chat</span>
                </button>
            </nav>
        </div>
    );
}
