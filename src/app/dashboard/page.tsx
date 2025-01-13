import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export default async function DashboardPage() {
    const session = await auth();
    const user = await prisma.account.findUnique({
        where: {
            email: session?.user?.email!
        }
    });

    if (user?.isAdmin) {
        redirect("/dashboard/overview");
    }

    redirect("/dashboard/profile");
}
