import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";

export default async function CustomerDashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Navigation />
            {children}
            <Footer />
        </>
    );
}
