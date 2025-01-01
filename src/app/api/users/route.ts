import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const users = await prisma.account.findMany({
      select: {
        id: true,
        nama_panjang: true,
        email: true,
        no_telepon: true,
        alamat: true,
        jl_no_rt_rw: true,
        image: true,
        kelurahan: {
          select: {
            id: true,
            nama: true,
            kecamatan: {
              select: {
                id: true,
                nama: true,
                kabukota: {
                  select: {
                    id: true,
                    nama: true,
                    provinsi: {
                      select: {
                        id: true,
                        nama: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}
