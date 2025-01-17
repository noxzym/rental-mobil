import prisma from "@/lib/prisma";
import ManageUser from "./_components/ManageUser";

export default async function ManageUserPage() {
    const accounts = await prisma.account.findMany({
        where: {
            isAdmin: false
        },
        include: {
            booking: true,
            kelurahan: {
                include: {
                    kecamatan: {
                        include: {
                            kabukota: true
                        }
                    }
                }
            }
        }
    });

    return (
        <section className="col-span-3 flex flex-col gap-3 rounded-xl bg-background px-4 py-5 shadow">
            {accounts.map((account, index) => (
                <ManageUser key={index} account={account} />
            ))}
        </section>
    );
}
