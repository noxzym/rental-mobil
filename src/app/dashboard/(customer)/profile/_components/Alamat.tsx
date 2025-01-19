"use client";

import { ChangeEvent, ComponentProps } from "react";
import { Prisma } from "@prisma/client";
import { useProfileStore } from "@/hooks/floppy-disk/use-profileStore";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import LocationDialog from "./LocationDialog";

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

export default function Alamat({ user }: props) {
    const profileStore = useProfileStore();

    const alamatLengkap = profileStore.isEditing ? profileStore.detailAlamat : user.detailAlamat;

    const alamat: (ComponentProps<"input"> & {
        bagian: "provinsi" | "kabukota" | "kecamatan" | "kelurahan";
        parent?: string;
    })[] = [
        {
            name: "Provinsi",
            bagian: "provinsi",
            placeholder: "Jawa Barat",
            value: profileStore.isEditing
                ? (profileStore.provinsi ?? undefined)
                : (user.kelurahan?.kecamatan.kabukota.provinsi.id ?? "Belum Diatur")
        },
        {
            name: "Kabupaten/Kota",
            bagian: "kabukota",
            placeholder: "Kota Depok",
            parent:
                (profileStore.isEditing
                    ? profileStore.provinsi
                    : user.kelurahan?.kecamatan.kabukota.provinsi.id) ?? undefined,
            value:
                (profileStore.isEditing
                    ? profileStore.kabukota
                    : user.kelurahan?.kecamatan.kabukota.id) ?? undefined
        },
        {
            name: "Kecamatan",
            bagian: "kecamatan",
            placeholder: "Beji",
            parent:
                (profileStore.isEditing
                    ? profileStore.kabukota
                    : user.kelurahan?.kecamatan.kabukota.id) ?? undefined,
            value:
                (profileStore.isEditing ? profileStore.kecamatan : user.kelurahan?.kecamatan.id) ??
                undefined
        },
        {
            name: "Kelurahan",
            bagian: "kelurahan",
            placeholder: "Pondok Cina",
            parent:
                (profileStore.isEditing ? profileStore.kecamatan : user.kelurahan?.kecamatan.id) ??
                undefined,
            value:
                (profileStore.isEditing ? profileStore.kelurahan : user.kelurahan?.id) ?? undefined
        }
    ];

    function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
        e.preventDefault();

        const target = e.target.name;

        switch (target) {
            case "Alamat Lengkap":
                useProfileStore.set({
                    ...profileStore,
                    detailAlamat: e.target.value
                });
                break;
        }
    }

    return (
        <Card className="rounded-xl p-5">
            <div className="flex w-full flex-col gap-3">
                <div className="flex flex-col gap-3">
                    <p className="text-sm">Alamat Lengkap</p>
                    <Input
                        name="Alamat Lengkap"
                        type="text"
                        placeholder="Jl. ... RT. ... RW. ..."
                        value={alamatLengkap ?? undefined}
                        onChange={e => handleOnChange(e)}
                        disabled={!profileStore.isEditing}
                        className="bg-gray-50"
                    />
                </div>
                <div className="grid grid-cols-2 gap-5">
                    {alamat.map((data, index) => (
                        <div key={index} className="flex flex-col gap-3">
                            <p className="text-sm">{data.name}</p>
                            <LocationDialog
                                parent={data.parent}
                                bagian={data.bagian}
                                value={data.value}
                                placeholder={data.placeholder}
                                disabled={
                                    !profileStore.isEditing ||
                                    (data.bagian === "kabukota"
                                        ? !profileStore.provinsi?.length
                                        : data.bagian === "kecamatan"
                                          ? !profileStore.kabukota?.length
                                          : data.bagian === "kelurahan"
                                            ? !profileStore.kecamatan?.length
                                            : false)
                                }
                            />
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    );
}
