import Image from "next/image";

export default function ListCar() {
    return (
        <section className="col-span-3 grid w-full gap-3">
            {Array.from({ length: 3 })
                .fill(0)
                .map((_, i) => (
                    <div
                        key={i}
                        className="flex w-full items-center justify-between rounded-xl bg-background px-4 py-5 shadow"
                    >
                        <div className="flex">
                            <span className="relative aspect-video h-auto w-40 rounded-lg">
                                <Image src="/assets/toyota-avanza.png" alt="toyota-avanza" fill />
                            </span>
                            <div className="ml-5 flex flex-col text-sm">
                                <p className="font-bold">Toyota Grand New Avanza</p>
                                <p>2021</p>
                                <p>Manual</p>
                            </div>
                        </div>
                        <div className="flex self-end">
                            <div className="flex">
                                <p className="text-2xl font-bold">IDR 350.000</p>
                                <p className="self-end text-sm"> / hari</p>
                            </div>
                        </div>
                    </div>
                ))}
            {Array.from({ length: 3 })
                .fill(0)
                .map((_, i) => (
                    <div
                        key={i}
                        className="flex w-full items-center justify-between rounded-xl bg-background px-4 py-5 shadow"
                    >
                        <div className="flex">
                            <span className="relative aspect-video h-auto w-40 rounded-lg">
                                <Image src="/assets/innova-zenix.png" alt="innova-zenix" fill />
                            </span>
                            <div className="ml-5 flex flex-col text-sm">
                                <p className="font-bold">Toyota Innova Zenix</p>
                                <p>2021</p>
                                <p>Manual</p>
                            </div>
                        </div>
                        <div className="flex self-end">
                            <div className="flex">
                                <p className="text-2xl font-bold">IDR 700.000</p>
                                <p className="self-end text-sm"> / hari</p>
                            </div>
                        </div>
                    </div>
                ))}
        </section>
    );
}
