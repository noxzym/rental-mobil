"use server";

import { hash } from "bcrypt";
import prisma from "@/lib/prisma";

interface createUserProp {
    email: string;
    password: string;
}

export async function createUser(data: createUserProp) {
    const ifExists = await findUser(data);
    if (ifExists) {
        return {
            error: "User with this email already exists."
        };
    }

    return prisma.account.create({
        data: {
            email: data.email,
            password: await hash(data.password, 10)
        }
    });
}

interface findUserProp {
    email: string;
}

export async function findUser(data: findUserProp) {
    return prisma.account.findUnique({
        where: {
            email: data.email
        }
    });
}
