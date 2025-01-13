import React from "react";
import { Prisma } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type User = Prisma.accountGetPayload<{
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

interface UserDetailProps {
    userId: string;
    onClose: () => void;
    userData?: User;
}

const UserDetail = ({ userId, onClose, userData }: UserDetailProps) => {
    const getCompleteAddress = () => {
        if (!userData?.kelurahan) return userData?.jl_no_rt_rw || userData?.alamat || "";

        return `${userData.jl_no_rt_rw || ""}`;
    };

    return (
        <div className="h-full bg-white p-6">
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold">User_{userId}</h2>
                <Button variant="ghost" onClick={onClose}>
                    ← Back
                </Button>
            </div>

            <div className="space-y-6">
                <Card className="p-4">
                    <div className="mb-4 flex items-center gap-4">
                        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-100">
                            {/* User avatar placeholder */}
                        </div>
                        <div className="flex-1 space-y-2">
                            <Input
                                className="bg-gray-50"
                                value={userData?.nama_panjang || ""}
                                placeholder="Nama Pengguna"
                                disabled
                            />
                            <Input
                                className="bg-gray-50"
                                value={userData?.email || ""}
                                placeholder="Alamat@Email.com"
                                disabled
                            />
                        </div>
                    </div>
                </Card>

                <Card className="space-y-4 p-4">
                    <Input
                        className="bg-gray-50"
                        value={getCompleteAddress()}
                        placeholder="Alamat Lengkap"
                        disabled
                    />

                    {userData?.kelurahan && (
                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                className="bg-gray-50"
                                value={`Kel. ${userData.kelurahan.nama}`}
                                placeholder="Kelurahan"
                                disabled
                            />
                            <Input
                                className="bg-gray-50"
                                value={`Kec. ${userData.kelurahan.kecamatan.nama}`}
                                placeholder="Kecamatan"
                                disabled
                            />
                            <Input
                                className="bg-gray-50"
                                value={userData.kelurahan.kecamatan.kabukota.nama}
                                placeholder="Kabupaten/Kota"
                                disabled
                            />
                            <Input
                                className="bg-gray-50"
                                value={userData.kelurahan.kecamatan.kabukota.provinsi.nama}
                                placeholder="Provinsi"
                                disabled
                            />
                        </div>
                    )}

                    <Input
                        className="bg-gray-50"
                        value={userData?.no_telepon || ""}
                        placeholder="No_telp"
                        disabled
                    />
                </Card>
            </div>
        </div>
    );
};

export default UserDetail;
