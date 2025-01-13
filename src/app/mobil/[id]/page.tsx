import CarDetails from "./_components/CarDetail";

export default async function MobilPage({
    params,
    searchParams
}: {
    params: { id: string };
    searchParams: { date: string; duration: string; time: string; location: string };
}) {
    return (
        <main className="container mx-auto py-6">
            <CarDetails
                mobilId={params.id}
                date={searchParams.date}
                duration={searchParams.duration}
                time={searchParams.time}
                location={searchParams.location}
            />
        </main>
    );
}
