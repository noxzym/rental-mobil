import { revalidatePath } from "next/cache";
import { signOut } from "next-auth/react";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { profileStoreType } from "@/hooks/floppy-disk/use-profileStore";
import Alamat from "./_components/Alamat";
import Biodata from "./_components/Biodata";
import Header from "./_components/Header";

export default async function ProfilePage() {
    const session = await auth();
    const user = await prisma.account.findUnique({
        where: {
            email: session?.user.email!
        },
        include: {
            kelurahan: {
                include: {
                    kecamatan: {
                        include: {
                            kabukota: {
                                include: {
                                    provinsi: true
                                }
                            }
                        }
                    }
                }
            }
        }
    });

    if (!user) return;

    async function handleSave(profileStore: profileStoreType) {
        "use server";

        await prisma.account
            .update({
                where: {
                    email: profileStore.email!
                },
                data: {
                    nama: profileStore!.nama,
                    noTelepon: profileStore!.noTelepon,
                    jenisKelamin: profileStore!.jenisKelamin,
                    tanggalLahir: profileStore!.tanggalLahir,
                    alamat: profileStore!.kelurahan,
                    detailAlamat: profileStore!.detailAlamat
                }
            })
            .catch(console.log);

        revalidatePath("/dashboard/profile");
    }

    return (
        <section className="col-span-3 flex flex-col gap-3 rounded-xl bg-background px-4 py-5 shadow">
            <Header user={user} onSave={handleSave} />
            <Biodata user={user} />
            <Alamat user={user} />
        </section>
    );
}
