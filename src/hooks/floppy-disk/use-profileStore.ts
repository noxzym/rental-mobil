import { Prisma } from "@prisma/client";
import { createStore } from "floppy-disk";

export type profileStoreType = Prisma.accountGetPayload<{}> & {
    isEditing: boolean;
    dialog: "provinsi" | "kabukota" | "kecamatan" | "kelurahan" | null;
    kelurahan: string | null;
    kecamatan: string | null;
    kabukota: string | null;
    provinsi: string | null;
};

export const useProfileStore = createStore<profileStoreType>(() => ({
    isEditing: false,
    dialog: null,
    id: "",
    nama: "",
    email: "",
    password: null,
    jenisKelamin: null,
    tanggalLahir: null,
    avatar: null,
    alamat: null,
    detailAlamat: null,
    noTelepon: null,
    isAdmin: null,
    kelurahan: null,
    kecamatan: null,
    kabukota: null,
    provinsi: null
}));
