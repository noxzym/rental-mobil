"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Edit2, Save, X } from "lucide-react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import LocationSelector from "./LocationSelectionDialog";

interface Location {
    id: string;
    nama: string;
}

interface UserData {
    email: string;
    nama_panjang: string;
    alamat: string;
    jl_no_rt_rw: string;
    no_telepon: string;
    kelurahan?: {
        id: string;
        nama: string;
        kecamatan: {
            id: string;
            nama: string;
            kabukota: {
                id: string;
                nama: string;
                provinsi: {
                    id: string;
                    nama: string;
                };
            };
        };
    };
}

interface LocationData {
    provinsi: Location[];
    kabukota: Location[];
    kecamatan: Location[];
    kelurahan: Location[];
}

export default function CustProfile() {
    const { data: session } = useSession();
    const router = useRouter();
    const [userData, setUserData] = useState<UserData | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState<Partial<UserData>>({});
    const [locationData, setLocationData] = useState<LocationData>({
        provinsi: [],
        kabukota: [],
        kecamatan: [],
        kelurahan: []
    });
    const [selectedLocations, setSelectedLocations] = useState({
        provinsiId: "",
        kabukotaId: "",
        kecamatanId: "",
        kelurahanId: ""
    });

    // Fetch user data
    useEffect(() => {
        const fetchUserData = async () => {
            if (session?.user?.email) {
                try {
                    const response = await fetch(`/api/cust-profile?email=${session.user.email}`);
                    if (response.ok) {
                        const data = await response.json();
                        setUserData(data);
                        setEditData(data);

                        // Set initial location selections if user has data
                        if (data.kelurahan) {
                            setSelectedLocations({
                                provinsiId: data.kelurahan.kecamatan.kabukota.provinsi.id,
                                kabukotaId: data.kelurahan.kecamatan.kabukota.id,
                                kecamatanId: data.kelurahan.kecamatan.id,
                                kelurahanId: data.kelurahan.id
                            });
                        }
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            }
        };
        fetchUserData();
    }, [session?.user?.email]);

    // Fetch location data
    useEffect(() => {
        const fetchLocationData = async () => {
            try {
                const response = await fetch("/api/locations");
                if (response.ok) {
                    const data = await response.json();
                    setLocationData(data);
                }
            } catch (error) {
                console.error("Error fetching location data:", error);
            }
        };
        fetchLocationData();
    }, []);

    // Filter location data based on selections
    const filteredKabukota = locationData.kabukota.filter(
        // @ts-ignore
        item => item.provinsiId === selectedLocations.provinsiId
    );

    const filteredKecamatan = locationData.kecamatan.filter(
        // @ts-ignore
        item => item.kabukotaId === selectedLocations.kabukotaId
    );

    const filteredKelurahan = locationData.kelurahan.filter(
        // @ts-ignore
        item => item.kecamatanId === selectedLocations.kecamatanId
    );

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditData(userData || {});
    };

    const handleSave = async () => {
        if (!session?.user?.email) return;

        try {
            const response = await fetch("/api/cust-profile", {
                method: "PUT",
                // headers: {
                //   'Content-Type': 'application/json',
                // },
                body: JSON.stringify({
                    email: session.user.email,
                    ...editData,
                    alamat: selectedLocations.kelurahanId // Save kelurahan ID as alamat
                })
            });

            if (response.ok) {
                const updatedData = await response.json();
                setUserData(updatedData);
                setIsEditing(false);
                router.refresh();
            }
        } catch (error) {
            console.error("Error updating user data:", error);
        }
    };

    return (
        <div className="h-full bg-white p-6">
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold">Profile</h2>
                {!isEditing ? (
                    <Button onClick={handleEdit} variant="outline" className="gap-2">
                        <Edit2 className="h-4 w-4" />
                        Edit Profile
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
            </div>

            <div className="space-y-6">
                <Card className="p-4">
                    <div className="mb-4 flex items-center gap-4">
                        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-100 text-2xl font-semibold text-blue-600">
                            {userData?.nama_panjang?.charAt(0)?.toUpperCase() || "?"}
                        </div>
                        <div className="flex-1 space-y-2">
                            <Input
                                className={isEditing ? "" : "bg-gray-50"}
                                value={
                                    isEditing
                                        ? editData.nama_panjang || ""
                                        : userData?.nama_panjang || ""
                                }
                                onChange={e =>
                                    setEditData({ ...editData, nama_panjang: e.target.value })
                                }
                                placeholder="Nama Pengguna"
                                disabled={!isEditing}
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
                        className={isEditing ? "" : "bg-gray-50"}
                        value={isEditing ? editData.jl_no_rt_rw || "" : userData?.jl_no_rt_rw || ""}
                        onChange={e => setEditData({ ...editData, jl_no_rt_rw: e.target.value })}
                        placeholder="Alamat Lengkap: Jl. * No. * RT */RW *"
                        disabled={!isEditing}
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <LocationSelector
                            title="Provinsi"
                            data={locationData.provinsi}
                            value={selectedLocations.provinsiId}
                            onChange={id =>
                                setSelectedLocations(prev => ({
                                    ...prev,
                                    provinsiId: id,
                                    kabukotaId: "",
                                    kecamatanId: "",
                                    kelurahanId: ""
                                }))
                            }
                            disabled={!isEditing}
                        />

                        <LocationSelector
                            title="Kabupaten/Kota"
                            data={filteredKabukota}
                            value={selectedLocations.kabukotaId}
                            onChange={id =>
                                setSelectedLocations(prev => ({
                                    ...prev,
                                    kabukotaId: id,
                                    kecamatanId: "",
                                    kelurahanId: ""
                                }))
                            }
                            disabled={!isEditing || !selectedLocations.provinsiId}
                        />

                        <LocationSelector
                            title="Kecamatan"
                            data={filteredKecamatan}
                            value={selectedLocations.kecamatanId}
                            onChange={id =>
                                setSelectedLocations(prev => ({
                                    ...prev,
                                    kecamatanId: id,
                                    kelurahanId: ""
                                }))
                            }
                            disabled={!isEditing || !selectedLocations.kabukotaId}
                        />

                        <LocationSelector
                            title="Kelurahan"
                            data={filteredKelurahan}
                            value={selectedLocations.kelurahanId}
                            onChange={id =>
                                setSelectedLocations(prev => ({
                                    ...prev,
                                    kelurahanId: id
                                }))
                            }
                            disabled={!isEditing || !selectedLocations.kecamatanId}
                        />
                    </div>

                    <Input
                        className={isEditing ? "" : "bg-gray-50"}
                        value={isEditing ? editData.no_telepon || "" : userData?.no_telepon || ""}
                        onChange={e => setEditData({ ...editData, no_telepon: e.target.value })}
                        placeholder="No. Telepon"
                        disabled={!isEditing}
                    />
                </Card>
            </div>
        </div>
    );
}
