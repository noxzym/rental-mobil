import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("query");

    if (!query) {
        const wilayah = await prisma.kabukota.findMany({
            take: 10,
            include: {
                provinsi: {
                    select: {
                        nama: true
                    }
                }
            }
        });

        return NextResponse.json(wilayah);
    }

    const wilayah = await prisma.kabukota.findMany({
        where: {
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
                },
                {
                    provinsi: {
                        nama: {
                            contains: query,
                            mode: "insensitive"
                        }
                    }
                }
            ]
        },
        include: {
            provinsi: {
                select: {
                    nama: true
                }
            }
        }
    });

    return NextResponse.json(wilayah);
}
