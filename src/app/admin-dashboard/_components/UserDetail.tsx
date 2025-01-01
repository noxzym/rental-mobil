import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface UserDetailProps {
  userId: string;
  onClose: () => void;
  userData?: {
    nama_panjang: string;
    email: string;
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
  };
}

const UserDetail = ({ userId, onClose, userData }: UserDetailProps) => {
  const getCompleteAddress = () => {
    if (!userData?.kelurahan) return userData?.jl_no_rt_rw || userData?.alamat || '';
    
    return `${userData.jl_no_rt_rw || ''}`;
  };

  return (
    <div className="h-full p-6 bg-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">User_{userId}</h2>
        <Button variant="ghost" onClick={onClose}>
          ← Back
        </Button>
      </div>

      <div className="space-y-6">
        <Card className="p-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center">
              {/* User avatar placeholder */}
            </div>
            <div className="space-y-2 flex-1">
              <Input 
                className="bg-gray-50"
                value={userData?.nama_panjang || ''}
                placeholder="Nama Pengguna"
                disabled
              />
              <Input 
                className="bg-gray-50"
                value={userData?.email || ''}
                placeholder="Alamat@Email.com"
                disabled
              />
            </div>
          </div>
        </Card>

        <Card className="p-4 space-y-4">
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
            value={userData?.no_telepon || ''}
            placeholder="No_telp"
            disabled
          />
        </Card>
      </div>
    </div>
  );
};

export default UserDetail;
