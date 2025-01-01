import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { checkAdmin } from "@/lib/checkAuth";

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
    await checkAdmin();

    return (
        <>
            <Navigation />
            {children}
            {/* <Footer /> */}
        </>
    );
}
