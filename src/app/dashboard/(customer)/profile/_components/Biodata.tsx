"use client";

import { ChangeEvent, ComponentProps, MouseEvent } from "react";
import { Prisma } from "@prisma/client";
import { signOut } from "next-auth/react";
import { deleteAccount } from "@/lib/actions";
import { cn } from "@/lib/utils";
import { useProfileStore } from "@/hooks/floppy-disk/use-profileStore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface props {
    user: Prisma.accountGetPayload<{
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
}

export default function Biodata({ user }: props) {
    const profileStore = useProfileStore();

    const nama = profileStore.isEditing ? profileStore.nama : user.nama;
    const email = user.email;
    const noTelepon = profileStore.isEditing ? profileStore.noTelepon : user.noTelepon;
    const jenisKelamin = profileStore.isEditing ? profileStore.jenisKelamin : user.jenisKelamin;
    const tanggalLahir = profileStore.isEditing ? profileStore.tanggalLahir : user.tanggalLahir;

    const biodata: ComponentProps<"input">[] = [
        {
            name: "Nama",
            placeholder: "Rentid Users",
            value: nama ?? undefined,
            type: "text"
        },
        {
            name: "Email",
            placeholder: "account@rent.id",
            value: email,
            type: "text"
        },
        {
            name: "Nomor HP",
            placeholder: "081234567890",
            value: noTelepon ?? undefined,
            type: "tel"
        },
        {
            name: "Jenis Kelamin",
            placeholder: "Pria",
            value: jenisKelamin ?? undefined,
            type: "text"
        },
        {
            name: "Tanggal Lahir",
            placeholder: "account@rent.id",
            // @ts-expect-error
            value: tanggalLahir ?? undefined,
            type: "date"
        }
    ];

    function handleSelect(e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) {
        useProfileStore.set({ jenisKelamin: e.currentTarget.id === "pria" ? "Pria" : "Wanita" });
    }

    function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
        e.preventDefault();

        const target = e.target.name;

        switch (target) {
            case "Nama":
                useProfileStore.set({
                    ...profileStore,
                    nama: e.target.value
                });
                break;

            case "Nomor HP":
                useProfileStore.set({
                    ...profileStore,
                    noTelepon: e.target.value
                });
                break;

            case "Tanggal Lahir":
                useProfileStore.set({
                    ...profileStore,
                    tanggalLahir: new Date(e.target.value)
                });
                break;
        }
    }

    async function handleOnDelete() {
        await deleteAccount({ where: { email } });
        await signOut({
            callbackUrl: "/"
        });
    }

    return (
        <Card className="rounded-xl p-5">
            <div className="flex gap-5">
                <div className="flex flex-col gap-3">
                    <Avatar className="size-60 rounded-xl">
                        <AvatarImage
                            src={user?.avatar ?? ""}
                            alt={`@${user?.nama?.slice(0, 2)}`}
                            className="size-full"
                        />
                        <AvatarFallback className="rounded-xl">
                            {user?.nama?.slice(0, 2)}
                        </AvatarFallback>
                    </Avatar>
                    <Button
                        variant="destructive"
                        className="font-semibold"
                        onClick={handleOnDelete}
                    >
                        Hapus Akun
                    </Button>
                </div>
                <div className="flex w-full flex-col gap-3 pt-5">
                    {biodata.map((data, index) => (
                        <div key={index} className="grid grid-cols-4 items-center">
                            <p className="text-sm">{data.name}</p>
                            {data.name === "Jenis Kelamin" ? (
                                <section className="col-span-3 grid grid-cols-3 gap-3">
                                    <Button
                                        id="pria"
                                        size="sm"
                                        variant="outline"
                                        onClick={handleSelect}
                                        disabled={!profileStore.isEditing}
                                        className={cn(
                                            "flex-grow hover:bg-[rgba(11,95,204)] hover:text-background",
                                            jenisKelamin === "Pria" &&
                                                "bg-[#1877F2] text-background"
                                        )}
                                    >
                                        Pria
                                    </Button>
                                    <Button
                                        id="wanita"
                                        size="sm"
                                        variant="outline"
                                        onClick={handleSelect}
                                        disabled={!profileStore.isEditing}
                                        className={cn(
                                            "flex-grow hover:bg-[rgba(11,95,204)] hover:text-background",
                                            jenisKelamin === "Wanita" &&
                                                "bg-[#1877F2] text-background"
                                        )}
                                    >
                                        Wanita
                                    </Button>
                                </section>
                            ) : (
                                <Input
                                    name={data.name}
                                    type={data.type}
                                    placeholder={data.placeholder}
                                    value={data.value}
                                    onChange={e => handleOnChange(e)}
                                    disabled={!profileStore.isEditing || data.name === "Email"}
                                    className="col-span-3 bg-gray-50"
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    );
}
