import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const car = await prisma.mobil.findUnique({
            where: {
                id: params.id
            }
        });

        if (!car) {
            return new NextResponse("Car not found", { status: 404 });
        }

        return NextResponse.json(car);
    } catch (error) {
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
