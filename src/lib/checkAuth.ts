import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export async function checkAdmin() {
    const session = await auth();

    if (!session) {
        console.log("No session found");
        redirect("/sign-in");
    }

    if (!session.user?.admin) {
        console.log("User is not admin:", session.user);
        redirect("/unauthorized");
    }

    return session;
}

export async function checkCustomer() {
    const session = await auth();

    if (!session) {
        console.log("No session found");
        redirect("/sign-in");
    }

    if (session.user?.admin) {
        console.log("User is admin:", session.user);
        redirect("/unauthorized");
    }

    return session;
}
