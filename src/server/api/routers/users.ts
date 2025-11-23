import Elysia from "elysia";
import { isNull, eq, and, lte } from "drizzle-orm";
import { db } from "../../db";
import { users } from "../../db/schema";
import z from "zod";

export const usersRouter = new Elysia({
    prefix: "/users"
})
.get("/", async () => {
    return await db.query.users.findMany({
        where: isNull(users.deletedAt)
    })
})
.get("/:id", async ({params}) => {
    return await db.query.users.findFirst({
        where: eq(users.id, params.id)
    })
}, {
    params: z.object({
        id: z.string()
    })
})
.get("/adults", async () => {
    const eighteenYearsOld = new Date();
    eighteenYearsOld.setFullYear(eighteenYearsOld.getFullYear() - 18);

    return await db.query.users.findMany({
        where: and(
            isNull(users.deletedAt),
            lte(users.birthDate, eighteenYearsOld)
        )
    })
})