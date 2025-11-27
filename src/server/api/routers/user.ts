import  { Context, Elysia } from "elysia";
import { auth } from "../../auth/auth";
import { userMiddleWare } from "../middleware/auth";
import { db } from "../../db";
import { eq } from "drizzle-orm";
import { user } from "../../db/auth-schema";

export const userService = new Elysia({
    name: "user/service"
})
.derive({ as: "global"}, async ({headers}) => await userMiddleWare(headers))
.macro({
    isSignedIn: (enabled? : boolean) => {
        if(!enabled) return;
        return {
            beforeHandle({session}) {
                if(!session?.user) {
                    throw new Response(JSON.stringify({
                        message: "You must be signed in to access this resource"
                    }), {status: 401})
                }
            }
        }
    },
    hasRole: (role: string) => ({
        beforeHandle({session}) {
            if(!session?.user) {
                throw new Response(JSON.stringify({
                    message: "You must be signed in to access this resource"
                }), {status: 401})
            }
            if (session.user.role !== role) {
                throw new Response(JSON.stringify({
                    message: "Insufficient permissions"
                }), {status: 403} )
            }
        }
    })
})

export const usersRouter = new Elysia({
    prefix: "/user"
})
.use(userService)
.get("/me", async ({session}) => {
    return await db.query.user.findFirst({
        where: eq(user.id, session!.user.id)
    })
}, {
    isSignedIn: true
})

const betterAuthView = async (context: Context) => {
    const BETTER_AUTH_ACCEPT_METHODS = ["POST", "GET"]
    if (BETTER_AUTH_ACCEPT_METHODS.includes(context.request.method)) {
        return auth.handler(context.request)
    } else {
        return new Response("Method Not Allowed", { status: 405 })
    }
}

export const userRouter = new Elysia().all("/auth/*", betterAuthView)