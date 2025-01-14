import Navigation from "@/components/Navigation";

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Navigation />
            {children}
            {/* <Footer /> */}
        </>
    );
}
