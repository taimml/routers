import Elysia from "elysia";
import { isNull, eq, and } from "drizzle-orm";
import { db } from "../../db";
import { favorites } from "../../db/schema";
import z from "zod";

export const favoritesRouter = new Elysia({
    prefix: "/favorites"
})
.get("/:userId", async ({params}) => {
    return await db.query.favorites.findMany({
        where: and(
            eq(favorites.userId, params.userId),
            isNull(favorites.deletedAt)
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