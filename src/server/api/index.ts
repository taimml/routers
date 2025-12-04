import Elysia from "elysia";
import { productsRouter } from "./routers/products";
import { userRouter } from "./routers/user";
import { cartRouter } from "./routers/cart";
import { favoritesRouter } from "./routers/favorites";
import { usersRouter } from "./routers/user";
import { adminRouter } from "./routers/admin";
import { fileRouter } from "./file";
import { treaty } from "@elysiajs/eden";
// import { headers as getHeaders } from "next/headers";

export const app = new Elysia({
    prefix: "/api"
})
.use(productsRouter)
.use(userRouter)
.use(cartRouter)
.use(favoritesRouter)
.use(usersRouter)
.use(adminRouter)
.use(fileRouter)

export type App = typeof app;

export const api = treaty<App>(app).api;

// export async function headers(): Promise<Record<string, string | undefined>>{
//     const h = await getHeaders()
//     const headers: Record<string, string | undefined> = {}
//     for (const [key, value] of h.entries()) {
//         headers[key] = value
//     }

//     return headers;
// }