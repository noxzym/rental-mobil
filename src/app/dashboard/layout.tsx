import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import Sidebar from "./_components/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Navigation />
            <section className="flex min-h-screen bg-[rgba(11,95,204,.1)] px-20 py-16">
                <div className="container grid w-full grid-cols-4 justify-between gap-5">
                    <Sidebar />
                    {children}
                </div>
            </section>
            <Footer />
        </>
    );
}
