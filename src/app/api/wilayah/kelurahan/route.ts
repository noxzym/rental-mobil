import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("query");
    const parent = searchParams.get("parent");

    if (!query) {
        const kelurahan = await prisma.kelurahan.findMany({
            take: 10,
            where: {
                kecamatanId: parent ?? undefined
            }
        });

        return NextResponse.json(kelurahan);
    }

    const kelurahan = await prisma.kelurahan.findMany({
        where: {
            AND: [
                {
                    kecamatanId: parent ?? undefined
                },
                {
                    OR: [
                        {
                            id: {
                                contains: query
                            }
                        },
                        {
                            nama: {
                                contains: query,
                                mode: "insensitive"
                            }
                        }
                    ]
                }
            ]
        }
    });

    return NextResponse.json(kelurahan);
}