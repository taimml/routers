import Elysia from "elysia";
import { isNull, eq, and } from "drizzle-orm";
import { db } from "../../db";
import { cart } from "../../db/schema";
import z from "zod";

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