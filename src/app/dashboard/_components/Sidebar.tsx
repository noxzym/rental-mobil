import { Car, ClipboardList, Home, MessageSquare, PencilLine, UserPen, Users } from "lucide-react";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import Navigation from "./Navigation";

export default async function Sidebar() {
    const session = await auth();
    const user = await prisma.account.findUnique({
        where: {
            email: session?.user?.email!
        }
    });

    const AdminNavigation: {
        title: string;
        icon: JSX.Element;
        href: string;
    }[] = [
        {
            title: "Overview",
            icon: <Home size={20} />,
            href: "/dashboard/overview"
        },
        {
            title: "Car Management",
            icon: <Car size={20} />,
            href: "/dashboard/manage/car"
        },
        {
            title: "Order Management",
            icon: <ClipboardList size={20} />,
            href: "/dashboard/manage/order"
        },
        {
            title: "User Management",
            icon: <Users size={20} />,
            href: "/dashboard/manage/user"
        },
        {
            title: "Reviews List",
            icon: <MessageSquare size={20} />,
            href: "/dashboard/reviews"
        }
    ];

    const CustomerNavigation: {
        title: string;
        icon: JSX.Element;
        href: string;
    }[] = [
        {
            title: "Profile",
            icon: <UserPen size={20} />,
            href: "/dashboard/profile"
        },
        {
            title: "Orders",
            icon: <ClipboardList size={20} />,
            href: "/dashboard/orders"
        },
        {
            title: "Reviews",
            icon: <PencilLine size={20} />,
            href: "/dashboard/reviews"
        }
    ];

    return (
        <section className="sticky top-[92px] flex h-fit w-full flex-col gap-3 rounded-xl bg-background px-4 py-5 shadow">
            <p className="text-center text-xl font-semibold">Dashboard</p>
            {user?.isAdmin ? (
                <Navigation routes={AdminNavigation} />
            ) : (
                <Navigation routes={CustomerNavigation} />
            )}
        </section>
    );
}
