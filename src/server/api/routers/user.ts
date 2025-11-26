import Elysia, { Context } from "elysia";
import { auth } from "../../auth/auth";
import { db } from "../../db";

const betterAuthView = async (context: Context) => {
    const BETTER_AUTH_ACCEPT_METHODS = ["POST", "GET"]
    if (BETTER_AUTH_ACCEPT_METHODS.includes(context.request.method)) {
        return auth.handler(context.request)
    } else {
        return new Response("Method Not Allowed", { status: 405 })
    }
}

export const userRouter = new Elysia().all("/auth/*", betterAuthView).get("/", async () => {
    return await db.query.user.findMany()
})