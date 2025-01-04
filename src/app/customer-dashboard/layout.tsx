import { checkCustomer } from "@/lib/checkAuth";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";

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
