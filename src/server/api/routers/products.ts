import Elysia from "elysia";
import { isNull, eq, ilike } from "drizzle-orm";
import { db } from "../../db";
import { products } from "../../db/schema";
import z from "zod";
import { productSchema } from "@/src/lib/shared/schemas/products";
import { userService } from "./user";
import { ServerCached, DEFAULT_TTL, InvalidateCached } from "../../redis";


export const productsRouter = new Elysia({
    prefix: "/products"
})

.use(userService)

.get("/", async () => {
    return await ServerCached(["products"], DEFAULT_TTL, async () => await db.query.products.findMany({
        where: isNull(products.deletedAt)
    }));

})

.get("/byPrice/:price", async ({params}) => {
    return await ServerCached(["products", params.price.toString()], DEFAULT_TTL, async () => await db.query.products.findMany({
        where: eq(products.price, params.price)
    }));
}, {
    params: z.object({
        price: z.number()
    })
})

.get("/:id", async ({params}) => {
    return await ServerCached(["products", params.id], DEFAULT_TTL, async () => await db.query.products.findFirst({
        where: eq(products.id, params.id)
    }));

}, {
    params: z.object({
        id: z.string()
    })
})

.get("/search", async ({ query}) => {
    return await db.query.products.findMany({
        where: ilike(products.name, `%${query.input}%`)
    })
}, {
    query: z.object({
        input: z.string()
    })
})

.post("/", async ({body}) => {
    const result = await db.insert(products).values(body).returning();
    await InvalidateCached(["products"]);
    return result;
    
}, {
    body: productSchema,
})

.put("/:id", async ({params, body}) => {
    const result = await db.update(products).set(body).where(eq(products.id, params.id)).returning()
    await InvalidateCached(["products", params.id]);
    await InvalidateCached(["products"]);
    return result;
}, {
    body: productSchema,
    params: z.object({
        id: z.string()
    })
})