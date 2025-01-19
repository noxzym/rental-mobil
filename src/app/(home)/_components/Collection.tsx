import Link from "next/link";
import { Prisma } from "@prisma/client";
import { formatCurrency } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import IconChevrolet from "@/components/brand/Chevrolet";
import IconHonda from "@/components/brand/Honda";
import IconHyundai from "@/components/brand/Hyundai";
import IconMazda from "@/components/brand/Mazda";
import IconMercedes from "@/components/brand/Mercedes";
import IconMitsubishi from "@/components/brand/Mitsubishi";
import IconNissan from "@/components/brand/Nissan";
import IconSuzuki from "@/components/brand/Suzuki";
import IconToyota from "@/components/brand/Toyota";

type props = {
    mobil: Prisma.mobilGetPayload<{}>[];
};

export default async function CollectionSection({ mobil }: props) {
    function BrandIcon({ brand }: { brand: string }) {
        const iconProps = "size-7 text-foreground";

        switch (brand.toLowerCase()) {
            case "chevrolet":
                return <IconChevrolet className={iconProps} />;
            case "honda":
                return <IconHonda className={iconProps} />;
            case "hyundai":
                return <IconHyundai className={iconProps} />;
            case "mazda":
                return <IconMazda className={iconProps} />;
            case "mercedes":
                return <IconMercedes className={iconProps} />;
            case "mitsubishi":
                return <IconMitsubishi className={iconProps} />;
            case "nissan":
                return <IconNissan className={iconProps} />;
            case "suzuki":
                return <IconSuzuki className={iconProps} />;
            case "toyota":
                return <IconToyota className={iconProps} />;
        }
    }

    return (
        <section className="flex w-full flex-col items-center gap-10">
            <p className="text-3xl font-bold">Pilihan Terbaik Kami</p>
            <div className="grid w-full grid-rows-2 gap-5 md:grid-cols-3">
                {mobil.map(car => (
                    <div
                        key={car.id}
                        className="flex flex-col gap-5 overflow-hidden rounded-xl border-1 pb-5"
                    >
                        <Avatar className="aspect-video h-auto w-full !rounded-none">
                            <AvatarImage
                                src={car.gambar}
                                alt={`${car.merek} ${car.model}`}
                                className="bg-foreground/10 object-cover"
                            />
                            <AvatarFallback useDynamicLoader={true} />
                        </Avatar>
                        <div className="flex items-center gap-2 px-5">
                            <span className="rounded-full border-1 p-1.5">
                                <BrandIcon brand={car.merek} />
                            </span>
                            <div className="flex flex-col">
                                <p className="text-lg font-bold">
                                    {car.merek} {car.model}
                                </p>
                                <p className="text-sm font-medium text-foreground/60">
                                    {car.transmisi} - {car.tahun}
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
                        <p className="px-5 text-lg font-bold">{formatCurrency(car.harga)}</p>
                    </div>
                ))}
            </div>
            <Button size="lg" asChild>
                <Link href="/search">Jelajahi Semua Mobil</Link>
            </Button>
        </section>
    );
}
