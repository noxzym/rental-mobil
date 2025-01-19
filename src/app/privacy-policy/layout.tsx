import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";

export default function PrivacyPolicyPageLayout({
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
