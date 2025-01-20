"use client";

import { useEffect } from "react";
import { Prisma } from "@prisma/client";
import { Edit2, Save, X } from "lucide-react";
import { updateAccount } from "@/lib/actions";
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
}

export default function Header({ user }: props) {
    const profileStore = useProfileStore();

    useEffect(() => {
        const key: (keyof profileStoreType)[] = [
            "nama",
            "email",
            "avatar",
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

    async function handleSave() {
        await updateAccount({
            where: {
                email: profileStore.email!
            },
            data: {
                nama: profileStore!.nama,
                avatar: profileStore!.avatar,
                noTelepon: profileStore!.noTelepon,
                jenisKelamin: profileStore!.jenisKelamin,
                tanggalLahir: profileStore!.tanggalLahir,
                alamat: profileStore!.kelurahan,
                detailAlamat: profileStore!.detailAlamat
            }
        });

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
