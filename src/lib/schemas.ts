import { z } from "zod";

export const formSchema = z
    .object({
        nama: z.string().min(3, { message: "Name must be at least 3 characters." }).optional(),
        email: z.string().email({ message: "Please enter a valid email address." }),
        password: z.string().min(8, { message: "Password must be at least 8 characters." }),
        confirm: z
            .string()
            .min(8, { message: "Password must be at least 8 characters." })
            .optional()
    })
    .refine(data => !data.confirm || data.password === data.confirm, {
        message: "Password don't match.",
        path: ["confirm"]
    });

export type formSchemaType = z.infer<typeof formSchema>;
