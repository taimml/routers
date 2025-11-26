import Elysia from "elysia";
import { productsRouter } from "./routers/products";
import { userRouter } from "./routers/user";
import { cartRouter } from "./routers/cart";
import { favoritesRouter } from "./routers/favorites";

export const app = new Elysia({
    prefix: "/api"
})
.use(productsRouter)
.use(userRouter)
.use(cartRouter)
.use(favoritesRouter)