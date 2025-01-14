import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("query");
    const parent = searchParams.get("parent");

    if (!query) {
        const kabukota = await prisma.kabukota.findMany({
            take: 10,
            where: {
                provinsiId: parent ?? undefined
            }
        });

        return NextResponse.json(kabukota);
    }

    const kabukota = await prisma.kabukota.findMany({
        where: {
            AND: [
                {
                    provinsiId: parent ?? undefined
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

    return NextResponse.json(kabukota);
}
