import Elysia from "elysia";
import { isNull, eq, ilike } from "drizzle-orm";
import { db } from "../../db";
import { products } from "../../db/schema";
import z from "zod";
import { productSchema } from "@/src/lib/client/shared/schemas/products";
import { userService } from "./user";


export const productsRouter = new Elysia({
    prefix: "/products"
})

.use(userService)

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
    return await db.insert(products).values(body).returning()
}, {
    body: productSchema,
})
.put("/:id", async ({params, body}) => {
    return await db.update(products).set(body).where(eq(products.id, params.id)).returning()
}, {
    body: productSchema,
    params: z.object({
        id: z.string()
    })
})