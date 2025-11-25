import Elysia from "elysia";
import { isNull, eq, and } from "drizzle-orm";
import { db } from "../../db";
import { cart } from "../../db/schema";
import z from "zod";
import { cartSchema } from "@/src/lib/client/shared/schemas/cart";

export const cartRouter = new Elysia({
    prefix: "/cart"
})
.get("/:userId", async ({params}) => {
    return await db.query.cart.findMany({
        where: and(
            eq(cart.userId, params.userId),
            isNull(cart.deletedAt)
        ),
        with: {
            product: true
        }
    })
}, {
    params: z.object({
        userId: z.string()
    })
})

.post("/", async ({body}) => {
    return await db.insert(cart).values(body).returning()
}, {
    body: cartSchema,
})
.put("/:id", async ({params, body}) => {
    return await db.update(cart).set(body).where(eq(cart.id, params.id)).returning()
}, {
    body: cartSchema,
    params: z.object({
        id: z.string()
    })
})