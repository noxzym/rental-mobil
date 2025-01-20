"use server";

import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";
import { hash } from "bcrypt";
import prisma from "@/lib/prisma";

// Account
export async function createAccount(data: Prisma.accountCreateArgs) {
    const ifExists = await findAccountByUnique({ where: { email: data.data.email } });
    if (ifExists) {
        if (!ifExists.password) {
            return {
                error: "You already have an account with Google."
            };
        }
        return {
            error: "User with this email already exists."
        };
    }

    data = {
        ...data,
        data: {
            ...data.data,
            password: await hash(data.data.password!, 10)
        }
    };

    return prisma.account.create(data);
}

export async function findAccountByUnique(data: Prisma.accountFindUniqueArgs) {
    return prisma.account.findUnique(data);
}

export async function updateAccount(data: Prisma.accountUpdateArgs) {
    await prisma.account.update(data);
    revalidatePath("/dashboard/profile");
}

export async function deleteAccount(data: Prisma.accountDeleteArgs) {
    await prisma.account.delete(data);
    revalidatePath("/dashboard/manage/user");
}

// Booking
export async function createBooking(createData: Prisma.bookingCreateArgs) {
    return prisma.booking.create(createData);
}

export async function updateBooking(createData: Prisma.bookingUpdateArgs) {
    await prisma.booking.update(createData);
    revalidatePath("/dashboard/overview");
    revalidatePath("/dashboard/manage/order");
    revalidatePath("/dashboard/orders");
}

// Mobil
export async function updateMobil(createData: Prisma.mobilUpdateArgs) {
    await prisma.mobil.update(createData);
    revalidatePath("/dashboard/manage-car");
}

export async function deleteMobil(createData: Prisma.mobilDeleteArgs) {
    await prisma.mobil.delete(createData);
    revalidatePath("/dashboard/manage-car");
}
