import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import { getBookingDates } from "@/lib/utils";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;

    const isAvailable = Boolean((searchParams.get("available") ?? "true") === "true");
    const date = searchParams.get("date");
    const duration = searchParams.get("duration");
    const sort = (searchParams.get("sortBy") ?? "harga") as "harga" | "tahun" | "merek" | "model";
    const order = (searchParams.get("orderBy") ?? "asc") as "asc" | "desc";

    let prismaQuery: Prisma.mobilFindManyArgs = {
        where: {
            status: isAvailable
                ? "READY"
                : {
                      not: "READY"
                  }
        },
        orderBy: {
            [sort]: order
        }
    };

    if (date && duration) {
        const { startDate, endDate } = getBookingDates(date, parseInt(duration));

        prismaQuery.where!.booking = {
            none: {
                AND: [{ startDate: { lte: endDate } }, { endDate: { gte: startDate } }]
            }
        };
    }

    if (!isAvailable && !date && !duration) {
        prismaQuery.where!.booking = {
            none: {}
        };
    }

    const cars = await prisma.mobil.findMany(prismaQuery).catch(error => ({ error }));

    if ("error" in cars) {
        console.error("Error fetching cars:", cars.error);
        return NextResponse.json({ error: "Failed to fetch cars" }, { status: 500 });
    }

    return NextResponse.json(cars);
}

export async function PATCH(request: NextRequest) {
    const jsonBody = await request.json().catch(error => ({ error }));

    if ("error" in jsonBody) {
        return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const { id, status } = jsonBody as { id: string; status: boolean };

    if (!id) {
        return NextResponse.json({ error: "Car ID is required" }, { status: 400 });
    }

    if (typeof status !== "boolean") {
        return NextResponse.json({ error: "Status must be a boolean" }, { status: 400 });
    }

    const updatedCar = await prisma.mobil
        .update({
            where: { id },
            data: { status: status === true ? "READY" : "MAINTENANCE" }
        })
        .catch(error => ({ error }));

    if ("error" in updatedCar) {
        console.error("Error updating car status:", updatedCar.error);
        return NextResponse.json({ error: "Failed to update car status" }, { status: 500 });
    }

    return NextResponse.json(updatedCar);
}
