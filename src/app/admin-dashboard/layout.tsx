import { checkAdmin } from "@/lib/checkAuth";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";

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
