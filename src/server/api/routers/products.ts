import Elysia from "elysia";
import { isNull, eq } from "drizzle-orm";
import { db } from "../../db";
import { products } from "../../db/schema";
import z from "zod";

export const productsRouter = new Elysia({
    prefix: "/products"
})
.get("/", async () => {
    return await db.query.products.findMany({
        where: isNull(products.deletedAt)
    })
})
.get("/:id", async ({params}) => {
    return await db.query.products.findFirst({
        where: eq(products.id, params.id)
    })
}, {
    params: z.object({
        id: z.string()
    })
})