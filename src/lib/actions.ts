"use server";

import { hash } from "bcrypt";
import prisma from "@/lib/prisma";
import { formSchemaType } from "./schemas";

export async function createUser(data: formSchemaType) {
    const ifExists = await findUserByUnique(data);
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

    return prisma.account.create({
        data: {
            nama: data.nama,
            email: data.email,
            password: await hash(data.password, 10)
        }
    });
}

export async function findUserByUnique(data: Omit<formSchemaType, "password" | "confirm">) {
    return prisma.account.findUnique({
        where: {
            email: data.email
        }
    });
}
