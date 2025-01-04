import prisma from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import IconHonda from "@/components/brand/Honda";
import IconHyundai from "@/components/brand/Hyundai";
import IconMercedes from "@/components/brand/Mercedes";
import IconMitsubishi from "@/components/brand/Mitsubishi";
import IconNissan from "@/components/brand/Nissan";
import IconSuzuki from "@/components/brand/Suzuki";
import IconToyota from "@/components/brand/Toyota";

type Car = {
    id: string;
    warna: string;
    merek: string;
    model: string;
    tahun: string;
    bangku: number;
    harga: number;
    image: string | null;
};

async function getCars() {
    try {
        const cars = await prisma.mobil.findMany({
            where: {
                status: true // Only show available cars
            },
            take: 6,
            orderBy: {
                tahun: "asc"
            },
            select: {
                id: true,
                warna: true,
                merek: true,
                model: true,
                tahun: true,
                bangku: true,
                harga: true,
                image: true
            }
        });
        return cars;
    } catch (error) {
        console.error("Error fetching cars:", error);
        return [];
    }
}

function BrandIcon({ brand }: { brand: string }) {
    const iconProps = "size-7 text-foreground";

    switch (brand.toLowerCase()) {
        case "honda":
            return <IconHonda className={iconProps} />;
        case "toyota":
            return <IconToyota className={iconProps} />;
        case "daihatsu":
            return <IconHonda className={iconProps} />;
        case "mitsubishi":
            return <IconMitsubishi className={iconProps} />;
        default:
            return <IconHonda className={iconProps} />; // Default fallback
    }
}

function formatPrice(price: number) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(price);
}

export default async function CollectionSection() {
    const cars = await getCars();

    return (
        <section className="flex w-full flex-col items-center gap-10">
            <p className="text-3xl font-bold">Koleksi Kami</p>
            <div className="grid w-full grid-cols-3 grid-rows-2 gap-5">
                {cars.map(car => (
                    <div
                        key={car.id}
                        className="flex flex-col gap-5 overflow-hidden rounded-xl border-1 pb-5"
                    >
                        <span className="aspect-video w-full bg-foreground/10">
                            {car.image && (
                                <img
                                    src={car.image}
                                    alt={car.model}
                                    className="h-full w-full object-cover"
                                />
                            )}
                        </span>
                        <div className="flex items-center gap-2 px-5">
                            <span className="rounded-full border-1 p-1.5">
                                <BrandIcon brand={car.merek} />
                            </span>
                            <div className="flex flex-col">
                                <p className="text-lg font-bold">{car.model}</p>
                                <p className="text-sm font-medium text-foreground/60">
                                    Manual - {car.tahun}
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 px-5">
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium">Warna Body</p>
                                <p className="font-bold">{car.warna}</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium">Slot Bangku</p>
                                <p className="font-bold">{car.bangku}</p>
                            </div>
                        </div>
                        <span className="flex px-5">
                            <Separator />
                        </span>
                        <p className="px-5 text-lg font-bold">{formatPrice(car.harga)},-</p>
                    </div>
                ))}
            </div>
            <Button size="lg">Jelajahi Semua Mobil</Button>
        </section>
    );
}
