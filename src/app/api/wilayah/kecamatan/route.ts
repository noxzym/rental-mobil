import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("query");
    const parent = searchParams.get("parent");

    if (!query) {
        const kecamatan = await prisma.kecamatan.findMany({
            take: 10,
            where: {
                kabukotaId: parent ?? undefined
            }
        });

        return NextResponse.json(kecamatan);
    }

    const kecamatan = await prisma.kecamatan.findMany({
        where: {
            AND: [
                {
                    kabukotaId: parent ?? undefined
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

    return NextResponse.json(kecamatan);
}
