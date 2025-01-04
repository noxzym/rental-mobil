import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            email: string;
            name?: string;
            image?: string;
            admin: boolean;
            alamat?: string;
            jl_no_rt_rw?: string;
            no_telepon?: string;
            nama_panjang?: string;
        };
    }
}
