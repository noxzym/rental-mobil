import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("query");

    if (!query) {
        const provinsi = await prisma.provinsi.findMany({
            take: 10
        });

        return NextResponse.json(provinsi);
    }

    const provinsi = await prisma.provinsi.findMany({
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
                }
            ]
        }
    });

    return NextResponse.json(provinsi);
}
