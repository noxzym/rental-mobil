import { StatusMobil } from "@prisma/client";
import prisma from "@/lib/prisma";
import { Separator } from "@/components/ui/separator";
import Footer from "@/components/Footer";
import CarLogo from "./_components/Car";
import CollectionSection from "./_components/Collection";
import JumbotronSection from "./_components/Jumbotron";
import ReviewSection from "./_components/Review";

export default async function HomePage() {
    const mobil = await prisma.mobil.findMany({
        where: {
            AND: [{ status: StatusMobil.Ready }, { booking: { some: {} } }]
        },
        orderBy: {
            booking: {
                _count: "desc"
            }
        },
        take: 6
    });

    return (
        <section className="container px-0">
            <JumbotronSection />
            <CarLogo />
            <Separator />
            <section className="flex flex-col items-center gap-20 px-4 py-6 md:px-20 md:py-24">
                <CollectionSection mobil={mobil} />
                <ReviewSection mobil={mobil} />
            </section>
            <Footer />
        </section>
    );
}
