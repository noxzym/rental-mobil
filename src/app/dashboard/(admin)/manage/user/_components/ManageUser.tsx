"use client";

import { Prisma } from "@prisma/client";
import { deleteAccount } from "@/lib/actions";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ToastAction } from "@/components/ui/toast";

type props = {
    account: Prisma.accountGetPayload<{
        include: {
            kelurahan: {
                include: {
                    kecamatan: {
                        include: {
                            kabukota: {
                                include: {
                                    provinsi: true;
                                };
                            };
                        };
                    };
                };
            };
        };
    }>;
};

export default function ManageUser({ account }: props) {
    function handleDeleteButton() {
        toast({
            title: "Hapus Akun",
            description: `Apakah kamu yakin ingin menghapus akun ${account.nama}?`,
            action: (
                <ToastAction
                    altText="Hapus Akun"
                    onClick={async () =>
                        deleteAccount({
                            where: {
                                email: account.email
                            }
                        })
                    }
                >
                    Hapus Akun
                </ToastAction>
            )
        });
    }

    return (
        <Card className="flex cursor-pointer items-center gap-4 border-none p-3 transition-all duration-150 hover:bg-foreground/5 hover:shadow">
            <Avatar className="size-14">
                <AvatarImage
                    src={account.avatar ?? ""}
                    alt={account.nama?.split(" ")[0]}
                    className="object-cover"
                />
                <AvatarFallback />
            </Avatar>
            <div className="flex w-full items-center justify-between">
                <div className="flex flex-col gap-1 py-1">
                    <p className="font-medium">{account.nama}</p>
                    <p className="text-sm font-medium text-gray-500">{account.email}</p>
                </div>
                <Button size="sm" variant="destructive" onClick={handleDeleteButton}>
                    Hapus Akun
                </Button>
            </div>
        </Card>
    );
}
