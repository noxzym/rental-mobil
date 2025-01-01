// src/app/api/locations/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const [provinsi, kabukota, kecamatan, kelurahan] = await Promise.all([
      prisma.provinsi.findMany(),
      prisma.kabukota.findMany(),
      prisma.kecamatan.findMany(),
      prisma.kelurahan.findMany(),
    ]);

    return NextResponse.json({
      provinsi,
      kabukota,
      kecamatan,
      kelurahan,
    });
  } catch (error) {
    console.error('Error fetching location data:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}