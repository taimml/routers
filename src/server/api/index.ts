import Elysia from "elysia";
import { productsRouter } from "./routers/products";
import { usersRouter } from "./routers/users";
import { cart, cartRelations } from "../db/schema";
import { cartRouter } from "./routers/cart";
import { favoritesRouter } from "./routers/favorites";

export const app = new Elysia({
    prefix: "/api"
})
.use(productsRouter)
.use(usersRouter)
.use(cartRouter)
.use(favoritesRouter)