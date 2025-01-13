import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
    const session = await auth();
    if (!session?.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const email = searchParams.get("email");

    if (email !== session.user.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userData = await prisma.account.findUnique({
        where: { email },
        include: {
            kelurahan: {
                include: {
                    kecamatan: {
                        include: {
                            kabukota: {
                                include: {
                                    provinsi: true
                                }
                            }
                        }
                    }
                }
            }
        }
    });

    if (!userData) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(userData);
}

export async function PUT(request: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const { email, nama, detailAlamat, noTelepon } = body;

        if (email !== session.user.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const updatedUser = await prisma.account.update({
            where: { email },
            data: {
                nama,
                detailAlamat,
                noTelepon
            },
            include: {
                kelurahan: {
                    include: {
                        kecamatan: {
                            include: {
                                kabukota: {
                                    include: {
                                        provinsi: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.error("Error updating user data:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
