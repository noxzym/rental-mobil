import prisma from "@/lib/prisma";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
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

        return Response.json(wilayah);
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
                        contains: query
                    }
                },
                {
                    provinsi: {
                        nama: {
                            contains: query
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

    console.log(query);

    return Response.json(wilayah);
}
