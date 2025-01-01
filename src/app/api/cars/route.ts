import prisma from "@/lib/prisma";
import { getBookingDates } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const queryType = searchParams.get('queryType') || 'availability';

    // For original availability search
    if (queryType === 'availability') {
        const date = searchParams.get('date');
        const duration = searchParams.get('duration');
        const sort = searchParams.get('sort') || 'harga';
        const order = (searchParams.get('order') || 'asc') as 'asc' | 'desc';

        if (!date || !duration) {
            return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
        }

        const { startDate, endDate } = getBookingDates(parseInt(date), parseInt(duration));

        try {
            const availableCars = await prisma.mobil.findMany({
                where: {
                    status: true,
                    NOT: {
                        booking: {
                            some: {
                                OR: [
                                    {
                                        AND: [
                                            { start_date: { lte: endDate } },
                                            { end_date: { gte: startDate } }
                                        ]
                                    }
                                ]
                            }
                        }
                    }
                },
                orderBy: {
                    [sort]: order
                }
            });

            return NextResponse.json(availableCars);
        } catch (error) {
            console.error('Error fetching cars:', error);
            return NextResponse.json({ error: 'Failed to fetch cars' }, { status: 500 });
        }
    }

    // For admin dashboard status-based queries
    if (queryType === 'status') {
        const status = searchParams.get('status') || 'ready';
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        try {
            let cars;
            
            switch (status) {
                case 'ready':
                    cars = await prisma.mobil.findMany({
                        where: {
                            status: true,
                            NOT: {
                                booking: {
                                    some: {
                                        AND: [
                                            { start_date: { lte: tomorrow } },
                                            { end_date: { gte: today } }
                                        ]
                                    }
                                }
                            }
                        }
                    });
                    break;

                case 'checking':
                    cars = await prisma.mobil.findMany({
                        where: {
                            status: false,
                            NOT: {
                                booking: {
                                    some: {
                                        AND: [
                                            { start_date: { lte: tomorrow } },
                                            { end_date: { gte: today } }
                                        ]
                                    }
                                }
                            }
                        }
                    });
                    break;

                case 'ordered':
                    cars = await prisma.mobil.findMany({
                        where: {
                            booking: {
                                some: {
                                    AND: [
                                        { start_date: { lte: tomorrow } },
                                        { end_date: { gte: today } }
                                    ]
                                }
                            }
                        }
                    });
                    break;

                default:
                    return NextResponse.json({ error: 'Invalid status parameter' }, { status: 400 });
            }

            return NextResponse.json(cars);
        } catch (error) {
            console.error('Error fetching cars:', error);
            return NextResponse.json({ error: 'Failed to fetch cars' }, { status: 500 });
        }
    }

    return NextResponse.json({ error: 'Invalid query type' }, { status: 400 });
}

export async function PATCH(request: NextRequest) {
    try {
        const body = await request.json();
        const { id, status } = body;

        if (!id) {
            return NextResponse.json({ error: 'Car ID is required' }, { status: 400 });
        }

        if (typeof status !== 'boolean') {
            return NextResponse.json({ error: 'Status must be a boolean' }, { status: 400 });
        }

        const updatedCar = await prisma.mobil.update({
            where: { id },
            data: { status },
        });

        return NextResponse.json(updatedCar);
    } catch (error) {
        console.error('Error updating car status:', error);
        return NextResponse.json({ error: 'Failed to update car status' }, { status: 500 });
    }
}