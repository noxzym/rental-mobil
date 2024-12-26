import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import IconHonda from "@/components/brand/Honda";

export default function CollectionSection() {
    return (
        <section className="flex w-full flex-col items-center gap-10">
            <p className="text-3xl font-bold">Koleksi Kami</p>
            <div className="grid w-full grid-cols-3 grid-rows-2 gap-5">
                {Array.from({ length: 6 }).map((_, index) => (
                    <div
                        key={index}
                        className="flex flex-col gap-5 overflow-hidden rounded-xl border-1 pb-5"
                    >
                        <span className="aspect-video w-full bg-foreground/10" />
                        <div className="flex items-center gap-2 px-5">
                            <span className="rounded-full border-1 p-1.5">
                                <IconHonda className="size-7 text-foreground" />
                            </span>
                            <div className="flex flex-col">
                                <p className="text-lg font-bold">Lorem Ipsum</p>
                                <p className="text-sm font-medium text-foreground/60">
                                    Manual - 2024
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 px-5">
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium">Warna Body</p>
                                <p className="font-bold">Silver</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium">Slot Bangku</p>
                                <p className="font-bold">4</p>
                            </div>
                        </div>
                        <span className="flex px-5">
                            <Separator />
                        </span>
                        <p className="px-5 text-lg font-bold">IDR 350.000,-</p>
                    </div>
                ))}
            </div>
            <Button size="lg">Jelajahi Semua Mobil</Button>
        </section>
    );
}
