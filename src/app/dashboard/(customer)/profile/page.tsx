import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
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

    return (
        <section className="col-span-3 flex flex-col gap-3 rounded-xl bg-background px-4 py-5 shadow">
            <Header user={user} />
            <Biodata user={user} />
            <Alamat user={user} />
        </section>
    );
}
