import z from "zod/v4"

export const favoriteSchema = z.object({
    userId: z.string(),
    productId: z.string(),
})