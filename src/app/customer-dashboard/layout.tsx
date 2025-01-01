import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { checkCustomer } from "@/lib/checkAuth";

export default async function CustomerDashboardLayout({ children }: { children: React.ReactNode }) {
    await checkCustomer();

    return (
        <>
            <Navigation />
            {children}
            <Footer />
        </>
    );
}
