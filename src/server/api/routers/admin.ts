import Elysia from "elysia";
import { db } from "../../db";
import { user, products } from "../../db/schema";
import { userService } from "./user";
import { eq, isNull } from "drizzle-orm";
import { DEFAULT_TTL, ServerCached } from "../../redis";

export const adminRouter = new Elysia({
    prefix: "/admin"
})
.use(userService)
.get("/users", async () => {
    return await ServerCached(["admin", "user"], DEFAULT_TTL, async () => await db.query.user.findMany({
        where: isNull(user.deletedAt)
    })) 
}, {
    hasRole: "admin"
})
