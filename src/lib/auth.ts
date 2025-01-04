import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { NextAuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";

const prisma = new PrismaClient();

// Custom Prisma Adapter to match your schema
const customPrismaAdapter = {
    ...PrismaAdapter(prisma),
    createUser: async (data: any) => {
        return prisma.account.create({
            data: {
                email: data.email,
                nama_panjang: data.name,
                image: data.image,
                emailVerified: data.emailVerified,
                admin: false
            }
        });
    },
    getUser: async (id: string) => {
        return prisma.account.findUnique({ where: { id } });
    },
    getUserByEmail: async (email: string) => {
        return prisma.account.findUnique({ where: { email } });
    },
    getUserByAccount: async (provider_providerAccountId: {
        provider: string;
        providerAccountId: string;
    }) => {
        return prisma.account.findFirst({
            where: {
                provider: provider_providerAccountId.provider,
                providerAccountId: provider_providerAccountId.providerAccountId
            }
        });
    }
};

export const authConfig: NextAuthOptions = {
    adapter: customPrismaAdapter,
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Invalid credentials");
                }

                const user = await prisma.account.findUnique({
                    where: {
                        email: credentials.email
                    }
                });

                if (!user || !user.password) {
                    throw new Error("Invalid credentials");
                }

                const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

                if (!isPasswordValid) {
                    throw new Error("Invalid credentials");
                }

                return {
                    id: user.id,
                    email: user.email,
                    name: user.nama_panjang,
                    image: user.image
                };
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_SECRET!,
            profile(profile) {
                return {
                    id: profile.sub,
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture
                };
            }
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_ID!,
            clientSecret: process.env.FACEBOOK_SECRET!
        })
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            try {
                if (account?.provider === "credentials") {
                    return true;
                }

                const existingUser = await prisma.account.findUnique({
                    where: {
                        email: user.email!
                    }
                });

                if (!existingUser) {
                    await prisma.account.create({
                        data: {
                            email: user.email!,
                            nama_panjang: user.name || "",
                            image: user.image,
                            provider: account?.provider,
                            providerAccountId: account?.providerAccountId,
                            emailVerified: new Date(),
                            admin: false,
                            password: null
                        }
                    });
                } else {
                    await prisma.account.update({
                        where: {
                            email: user.email!
                        },
                        data: {
                            nama_panjang: user.name || existingUser.nama_panjang,
                            image: user.image || existingUser.image,
                            emailVerified: existingUser.emailVerified || new Date(),
                            provider: existingUser.provider || account?.provider,
                            providerAccountId:
                                existingUser.providerAccountId || account?.providerAccountId
                        }
                    });
                }

                return true;
            } catch (error) {
                console.error("Error during sign in:", error);
                return false;
            }
        },
        async jwt({ token, user, account }) {
            // console.log("JWT Callback", { token, user, account });

            if (user) {
                token.id = user.id;
                // token.admin = user.admin;
                token.email = user.email;
            }
            return token;
        },
        async session({ session, token, user }) {
            // console.log("Session Callback", { session, token, user });

            if (session?.user) {
                const dbUser = await prisma.account.findUnique({
                    where: { email: session.user.email! },
                    select: {
                        id: true,
                        admin: true,
                        alamat: true,
                        no_telepon: true,
                        nama_panjang: true
                    }
                });

                // console.log("DB User:", dbUser);

                if (dbUser) {
                    session.user = {
                        ...session.user,
                        id: dbUser.id,
                        admin: Boolean(dbUser.admin),
                        alamat: dbUser.alamat ?? "",
                        no_telepon: dbUser.no_telepon ?? "",
                        nama_panjang: dbUser.nama_panjang ?? ""
                    };
                }
            }

            return session;
        }
    },
    pages: {
        signIn: "/"
    },
    session: {
        strategy: "jwt"
    }
};

export function auth(
    ...args:
        | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
        | [NextApiRequest, NextApiResponse]
        | []
) {
    return getServerSession(...args, authConfig);
}
