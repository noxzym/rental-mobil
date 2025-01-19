import { Prisma } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type props = {
    mobil: Prisma.mobilGetPayload<{}>[];
};

export default function ReviewSection({ mobil }: props) {
    return (
        <section className="flex w-full flex-col items-center gap-10">
            <p className="text-3xl font-bold">Ulasan Terbaru</p>
            <div className="grid w-full gap-5 md:grid-cols-3">
                {mobil.slice(0, 3).map((car, index) => (
                    <div
                        key={index}
                        className="relative aspect-square w-full overflow-hidden rounded-xl"
                    >
                        <Avatar className="relative h-full w-full !rounded-none">
                            <AvatarImage
                                src={car.gambar}
                                alt={`${car.merek} ${car.model}`}
                                className="bg-foreground/10 object-cover"
                            />
                            <AvatarFallback useDynamicLoader={true} />
                            <span className="absolute z-10 h-full w-full bg-gradient-to-b from-black/10 to-black/80" />
                        </Avatar>
                        <div className="absolute bottom-0 left-0 right-0 z-20 flex flex-col gap-1 px-4 py-5">
                            <p className="text-xl font-bold text-white">Lorem Ipsum</p>
                            <p className="text-white">
                                &quot;Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure,
                                incidunt.&quot;
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
