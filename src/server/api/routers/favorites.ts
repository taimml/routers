import Elysia from "elysia";
import { isNull, eq, and } from "drizzle-orm";
import { db } from "../../db";
import { favorites } from "../../db/schema";
import z from "zod";
import { favoriteSchema } from "@/src/lib/client/shared/schemas/favorites";
import { userService } from "./user";

export const favoritesRouter = new Elysia({
    prefix: "/favorites"
})
.use(userService)
.get("/my", async ({ session }) => {
    return await db.query.favorites.findMany({
        where: and(
            eq(favorites.userId, session!.user.id),
            isNull(favorites.deletedAt)
        )
    })
}, {
    isSignedIn: true
})

.post("/", async ({body, session}) => {
    const favoriteData = {
        userId: session!.user.id,
        productId: body.productId,
        timeAdded: new Date()
    };
    return await db.insert(favorites).values(favoriteData).returning()
}, {
    body: favoriteSchema,
    isSignedIn: true
})

