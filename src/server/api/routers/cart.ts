import Elysia from "elysia";
import { isNull, eq, and } from "drizzle-orm";
import { db } from "../../db";
import { cart } from "../../db/schema";
import z from "zod";
import { cartSchema } from "@/src/lib/client/shared/schemas/cart";
import { userService } from "./user";

export const cartRouter = new Elysia({
    prefix: "/cart"
})
.use(userService)
.get("/my", async ({ session }) => {
    return await db.query.cart.findMany({
        where: and(
            eq(cart.userId, session!.user.id),
            isNull(cart.deletedAt)
        )
    })
}, {
    isSignedIn: true
})

.post("/", async ({body, session}) => {
    const cartData = {
        userId: session!.user.id,
        productId: body.productId,
        quantity: body.quantity
    };

    return await db.insert(cart).values(cartData).returning()
}, {
    body: cartSchema,
    isSignedIn: true
})

.put("/:id", async ({params, body, session}) => {
    return await db.update(cart).set(body)
        .where(and(
            eq(cart.id, params.id),
            eq(cart.userId, session!.user.id))).returning();
}, {
    body: cartSchema,
    params: z.object({
        id: z.string()
    }),
    isSignedIn: true
})