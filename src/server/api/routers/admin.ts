import Elysia from "elysia";
import { db } from "../../db";
import { user, products } from "../../db/schema";
import { userService } from "./user";
import { eq, isNull } from "drizzle-orm";
import z from "zod";

export const adminRouter = new Elysia({
    prefix: "/admin"
})
.use(userService)
.get("/users", async () => {
    return await db.query.user.findMany({
        where: isNull(user.deletedAt)
    })
}, {
    hasRole: "admin"
})

.get("/products", async () => {
    return await db.query.user.findMany({
        where: isNull(products.deletedAt)
    });
}, {
    hasRole: "admin"
})

// .delete("/users/:id", async ({ params }) => {
//     return await db.delete(user).where(eq(user.id, params.id)).returning();
// }, {
//     hasRole: "admin",
//     params: z.object({
//         id: z.string()
//     })
// })