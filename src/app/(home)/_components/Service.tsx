import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ServiceSection() {
    return (
        <section className="">
            <Avatar className="aspect-video h-auto w-full !rounded-none">
                <AvatarImage
                    src="https://cdn.noxzym.my.id/images/services.svg"
                    alt="Service"
                    className=""
                />
                <AvatarFallback useDynamicLoader={true} />
            </Avatar>
        </section>
    );
    // return (
    //     <section className="relative flex w-full overflow-hidden rounded-xl">
    //         <span className="z-10 aspect-video w-full bg-[linear-gradient(to_bottom,var(--tw-gradient-stops)),url('https://cdn.noxzym.my.id/images/mazda-cx-3.webp')] from-transparent from-30% to-white bg-cover bg-center bg-no-repeat" />
    //         <div className="absolute bottom-20 z-20 flex w-full flex-col items-center gap-6">
    //             <p className="text-3xl font-bold">Alasan Harus Memilih Kami</p>
    //             <div className="grid w-3/4 grid-cols-3 gap-5">
    //                 {Array.from({ length: 3 }).map((_, index) => (
    //                     <div
    //                         key={index}
    //                         className="flex aspect-video w-full flex-col items-center justify-center rounded-xl bg-foreground/50"
    //                     ></div>
    //                 ))}
    //             </div>
    //         </div>
    //     </section>
    // );
}
