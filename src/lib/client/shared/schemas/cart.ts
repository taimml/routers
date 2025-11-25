import z from "zod/v4"

export const cartSchema = z.object({
    userId: z.string(),
    productId: z.string(),
    quantity: z.number().min(1, "Minimum quantity is 1"),
})