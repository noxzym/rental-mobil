"use client";

import { useEffect } from "react";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";
import { Edit2, Save, X } from "lucide-react";
import { Session } from "next-auth";
import prisma from "@/lib/prisma";
import { profileStoreType, useProfileStore } from "@/hooks/floppy-disk/use-profileStore";
import { Button } from "@/components/ui/button";

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
    onSave: (profileStore: profileStoreType) => void;
}

export default function Header({ user, onSave }: props) {
    const profileStore = useProfileStore();

    useEffect(() => {
        const key: (keyof profileStoreType)[] = [
            "nama",
            "email",
            "jenisKelamin",
            "tanggalLahir",
            "avatar",
            "alamat",
            "detailAlamat",
            "noTelepon",
            "kelurahan",
            "kecamatan",
            "kabukota",
            "provinsi"
        ];

        const allFieldsNullOrUndefined = key.every(k => !profileStore[k]);

        if (allFieldsNullOrUndefined) {
            useProfileStore.set({
                ...profileStore,
                nama: user.nama,
                email: user.email,
                jenisKelamin: user.jenisKelamin,
                tanggalLahir: user.tanggalLahir,
                avatar: user.avatar,
                alamat: user.alamat,
                detailAlamat: user.detailAlamat,
                noTelepon: user.noTelepon,
                kelurahan: user.kelurahan?.id,
                kecamatan: user.kelurahan?.kecamatan.id,
                kabukota: user.kelurahan?.kecamatan.kabukota.id,
                provinsi: user.kelurahan?.kecamatan.kabukota.provinsi.id
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function handleEdit() {
        useProfileStore.set({ isEditing: !profileStore.isEditing });
    }

    function handleCancel() {
        handleEdit();
        useProfileStore.set({
            nama: user.nama,
            email: user.email,
            jenisKelamin: user.jenisKelamin,
            tanggalLahir: user.tanggalLahir,
            avatar: user.avatar,
            alamat: user.alamat,
            detailAlamat: user.detailAlamat,
            noTelepon: user.noTelepon,
            kelurahan: user.kelurahan?.id,
            kecamatan: user.kelurahan?.kecamatan.id,
            kabukota: user.kelurahan?.kecamatan.kabukota.id,
            provinsi: user.kelurahan?.kecamatan.kabukota.provinsi.id
        });
    }

    function handleSave() {
        onSave(profileStore);
        handleEdit();
    }

    return (
        <header className="flex items-center justify-between">
            <p className="text-xl font-semibold">Biodata Diri</p>
            {!profileStore.isEditing ? (
                <Button onClick={handleEdit} variant="outline" className="gap-2">
                    <Edit2 className="h-4 w-4" />
                    Edit
                </Button>
            ) : (
                <div className="space-x-2">
                    <Button onClick={handleSave} variant="default" className="gap-2">
                        <Save className="h-4 w-4" />
                        Save
                    </Button>
                    <Button onClick={handleCancel} variant="outline" className="gap-2">
                        <X className="h-4 w-4" />
                        Cancel
                    </Button>
                </div>
            )}
        </header>
    );
}
