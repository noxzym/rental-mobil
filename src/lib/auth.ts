import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";
import { compare } from "bcrypt";
import { NextAuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import prisma from "./prisma";

export const authConfig: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_SECRET!,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_ID!,
            clientSecret: process.env.FACEBOOK_SECRET!
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {},
                password: {}
            },
            async authorize(credentials) {
                const user = await prisma.account.findUnique({
                    where: {
                        email: credentials?.email!
                    }
                });

                if (!user || !user.password) return null;

                const comparedPassword = await compare(credentials?.password ?? "", user.password);
                if (!comparedPassword) return null;

                return user;
            }
        })
    ],
    callbacks: {
        async signIn({ account, user }) {
            if (account?.provider === "credentials") return true;

            await prisma.account.upsert({
                where: {
                    email: user.email!
                },
                update: {},
                create: {
                    email: user.email!,
                    nama: user.name ?? null,
                    avatar: user.image ?? null
                }
            });

            return true;
        },
        async jwt({ token, user }) {
            const userDB = await prisma.account.findUnique({
                where: {
                    email: token.email!
                },
                select: {
                    isAdmin: true
                }
            });

            if (user) {
                token = { ...token, isAdmin: userDB?.isAdmin ?? false };
            }

            return token;
        },
        async session({ session, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    isAdmin: token.isAdmin
                }
            };
        }
    }
} satisfies NextAuthOptions;

export function auth(
    ...args:
        | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
        | [NextApiRequest, NextApiResponse]
        | []
) {
    return getServerSession(...args, authConfig);
}
