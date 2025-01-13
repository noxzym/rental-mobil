import prisma from "@/lib/prisma";
import { Separator } from "@/components/ui/separator";
import Footer from "@/components/Footer";
import CarLogo from "./_components/Car";
import CollectionSection from "./_components/Collection";
import JumbotronSection from "./_components/Jumbotron";
import ReviewSection from "./_components/Review";
import ServiceSection from "./_components/Service";

export default async function HomePage() {
    const mobil = await prisma.mobil.findMany({
        where: {
            status: "READY"
        },
        orderBy: {
            tahun: "asc"
        },
        take: 6
    });

    return (
        <>
            <JumbotronSection />
            <CarLogo />
            <Separator />
            <section className="flex flex-col items-center gap-20 px-20 py-24">
                <CollectionSection mobil={mobil} />
                <ServiceSection />
                <ReviewSection mobil={mobil} />
            </section>
            <Footer />
        </>
    );
}
