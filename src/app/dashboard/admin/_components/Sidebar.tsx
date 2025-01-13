import Link from "next/link";
import { Car, ClipboardList, Home, MessageCircleMore, MessageSquare, Users } from "lucide-react";
import Logo from "@/components/Logo";

interface SidebarProps {
    setActivePage: (page: string) => void;
}

export default function Sidebar({ setActivePage }: SidebarProps) {
    return (
        <div className="h-screen w-64 bg-white p-4">
            <Link href="/" className="[&_svg]:h-auto [&_svg]:w-20">
                <Logo />
            </Link>
            <nav className="space-y-2">
                <button
                    onClick={() => setActivePage("dashboard")}
                    className="flex w-full items-center gap-2 rounded p-2 text-left hover:bg-blue-50"
                >
                    <Home size={20} />
                    <span>Dashboard</span>
                </button>
                <button
                    onClick={() => setActivePage("cars")}
                    className="flex w-full items-center gap-2 rounded p-2 text-left hover:bg-blue-50"
                >
                    <Car size={20} />
                    <span>Car Management</span>
                </button>
                <button
                    onClick={() => setActivePage("orders")}
                    className="flex w-full items-center gap-2 rounded p-2 text-left hover:bg-blue-50"
                >
                    <ClipboardList size={20} />
                    <span>Order Management</span>
                </button>
                <button
                    onClick={() => setActivePage("users")}
                    className="flex w-full items-center gap-2 rounded p-2 text-left hover:bg-blue-50"
                >
                    <Users size={20} />
                    <span>User Management</span>
                </button>
                <button
                    onClick={() => setActivePage("reviews")}
                    className="flex w-full items-center gap-2 rounded p-2 text-left hover:bg-blue-50"
                >
                    <MessageSquare size={20} />
                    <span>Reviews List</span>
                </button>
                <button
                    onClick={() => setActivePage("chat")}
                    className="flex w-full items-center gap-2 rounded p-2 text-left hover:bg-blue-50"
                >
                    <MessageCircleMore size={20} />
                    <span>Chat From User</span>
                </button>
            </nav>
        </div>
    );
}
