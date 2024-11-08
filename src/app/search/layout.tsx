import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";

export default function SearchLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Navigation />
            {children}
            <Footer />
        </>
    );
}
