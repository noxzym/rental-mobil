"use server";

import { Prisma } from "@prisma/client";
import { hash } from "bcrypt";
import prisma from "@/lib/prisma";

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

export async function deleteAccount(data: Prisma.accountDeleteArgs) {
    return prisma.account.delete(data);
}

export async function createBooking(createData: Prisma.bookingCreateArgs) {
    return prisma.booking.create(createData);
}

export async function updateMobil(createData: Prisma.mobilUpdateArgs) {
    return prisma.mobil.update(createData);
}
