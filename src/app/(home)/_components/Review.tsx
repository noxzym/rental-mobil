import Image from "next/image";

export default function ReviewSection() {
    return (
        <section className="flex w-full flex-col items-center gap-10">
            <p className="text-3xl font-bold">Kata Mereka Tentang Kami</p>
            <div className="grid w-full grid-cols-3 gap-5">
                {Array.from({ length: 3 }).map((_, index) => (
                    <div
                        key={index}
                        className="relative aspect-square w-full overflow-hidden rounded-xl"
                    >
                        <Image
                            src="https://placehold.co/100x100?text=Car\nImage"
                            alt="Placeholder"
                            fill
                        />
                        <span className="absolute z-10 h-full w-full bg-gradient-to-b from-black/10 to-black/80" />
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
