"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { StatusBooking, StatusMobil } from "@prisma/client";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { createBooking, findAccountByUnique, updateMobil } from "@/lib/actions";
import { formatCurrency, getBookingDates, getBookingPrices } from "@/lib/utils";
import { useCarStore } from "@/hooks/floppy-disk/use-carStore";
import { useQueryStore } from "@/hooks/floppy-disk/use-queryStore";
import { useWilayahQuery } from "@/hooks/floppy-disk/use-wilayahQuery";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function Aside() {
    const router = useRouter();
    const session = useSession();
    const carStore = useCarStore({ id: "selected" });
    const queryStore = useQueryStore();
    const [loading, setLoading] = useState(false);

    const wilayah = useWilayahQuery({
        query: queryStore.location ?? "3276"
    });

    const CarData = [
        {
            title: "Mobil",
            value: `${carStore.merek} ${carStore.model} (${carStore.tahun})`
        },
        {
            title: "Transmisi",
            value: carStore.transmisi
        },
        {
            title: "Warna",
            value: carStore.warna
        },
        {
            title: "Jumlah Bangku",
            value: `${carStore.bangku} Kursi`
        },
        {
            title: "Harga Sewa",
            value: formatCurrency(carStore.harga)
        }
    ];

    const BookingData = [
        {
            title: "Tanggal Penyewaan",
            value: format(new Date(Number(queryStore.date)), "dd MMM yyyy")
        },
        {
            title: "Waktu Penyewaan",
            value: `${Number(queryStore.time) < 10 ? `0${queryStore.time}` : queryStore.time}:00`
        },
        {
            title: "Kabupaten/Kota Tujuan",
            value: wilayah.data?.[0].nama.toLowerCase().replace("kab.", "kabupaten")
        },
        {
            title: "Durasi Penyewaan",
            value: `${queryStore.duration} Hari`
        },
        {
            title: "Opsi Driver",
            value: queryStore.driver ? "Dengan Driver" : "Tanpa Driver"
        }
    ];

    async function handleBook() {
        setLoading(true);

        if (session.status === "unauthenticated") {
            toast({
                title: "Akses Ditolak",
                variant: "destructive",
                description: "Anda harus login terlebih dahulu untuk melakukan pemesanan."
            });
            setLoading(false);
            return;
        }

        const user = await findAccountByUnique({
            where: {
                email: session.data?.user.email!
            }
        });

        if (user?.isAdmin) {
            toast({
                title: "Akses Ditolak",
                variant: "destructive",
                description: "Anda tidak dapat melakukan pemesanan karena Anda adalah admin."
            });
            setLoading(false);
            return;
        }

        if (
            !user?.nama?.length ||
            !user?.alamat?.length ||
            !user?.detailAlamat?.length ||
            !user?.noTelepon?.length
        ) {
            toast({
                title: "Data tidak lengkap",
                variant: "destructive",
                description: "Silakan lengkapi data diri Anda terlebih dahulu."
            });
            setLoading(false);
            return;
        }

        const { startDate, endDate } = getBookingDates(
            Number(queryStore.date),
            Number(queryStore.duration)
        );

        const booking = await createBooking({
            data: {
                account: {
                    connect: {
                        email: session.data?.user.email!
                    }
                },
                mobil: {
                    connect: {
                        id: carStore.id
                    }
                },
                kabukota: {
                    connect: {
                        id: wilayah.data?.[0].id!
                    }
                },
                driver: queryStore.driver
                    ? `Driver ${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`
                    : null,
                startDate: startDate,
                endDate: endDate,
                pickupTime: `${Number(queryStore.time) < 10 ? `0${queryStore.time}` : queryStore.time}:00`,
                status: StatusBooking.OnGoing
            }
        }).catch(error => ({ error }));

        setLoading(false);

        const mobil = await updateMobil({
            where: {
                id: carStore.id
            },
            data: {
                status: StatusMobil.Booked
            }
        }).catch(error => ({ error }));

        if ("error" in (booking || mobil)) {
            toast({
                title: "Gagal Memesan",
                variant: "destructive",
                description: "Terjadi kesalahan saat memesan mobil."
            });
            return;
        }

        toast({
            title: "Berhasil Memesan",
            description: "Silakan cek status pesanan Anda di halaman pesanan."
        });

        useCarStore.set({ id: "selected" }, {});

        router.push("/dashboard/orders");
    }

    if (!carStore.id.length) {
        return (
            <div className="h-fit rounded-xl bg-white p-6 shadow-md">
                <h2 className="text-center text-xl font-bold">Detail Pesanan</h2>
                <p className="mt-4 text-center text-gray-500">
                    Silakan pilih mobil dan isi detail pemesanan
                </p>
            </div>
        );
    }

    return (
        <aside className="flex h-fit flex-col gap-5 rounded-xl bg-white px-4 py-5 shadow-md">
            <div className="space-y-3">
                <p className="text-lg font-bold">Detail Pesanan</p>
                <Separator />
            </div>
            <div className="flex flex-col gap-3">
                {CarData.map((data, index) => (
                    <div key={index} className="space-y-1">
                        <p className="font-medium">{data.title}</p>
                        <div className="flex rounded border bg-gray-50 px-3 py-1 text-sm">
                            <p>{data.value}</p>
                        </div>
                    </div>
                ))}
            </div>
            <Separator />
            <div className="flex flex-col gap-3">
                {BookingData.map((data, index) => (
                    <div key={index} className="space-y-1">
                        <p className="font-medium">{data.title}</p>
                        <div className="flex rounded border bg-gray-50 px-3 py-1 text-sm capitalize">
                            <p>{data.value}</p>
                        </div>
                    </div>
                ))}
            </div>
            <Separator />
            <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>{getBookingPrices(carStore.harga, Number(queryStore.duration))}</span>
            </div>
            <Button
                className="w-full bg-blue-500 text-white hover:bg-blue-600"
                onClick={handleBook}
                disabled={loading}
            >
                {loading ? "Processing..." : "Book Now"}
            </Button>
        </aside>
    );
}
