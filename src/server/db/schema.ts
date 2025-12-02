import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { createTableRelationsHelpers, placeholder, relations } from "drizzle-orm";
import { contentType } from "mime-types";
export * from "./auth-schema"
import { text } from "drizzle-orm/pg-core";

const commonFields = {
    id: varchar("id", { length: 255 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
    createdAt: timestamp("created_at").defaultNow(),
    deletedAt: timestamp("deleted_at"),
}

export const files = pgTable("files", {
    id: varchar("id", { length: 255 }).primaryKey().notNull().$defaultFn(() => crypto.randomUUID()),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    fileName: varchar("file_name", { length: 255 }).notNull(),
    fileSize: integer("file_size").notNull(),
    contentType: varchar("content_type", { length: 255 }).notNull(),
    placeholder: text("placeholder"),
})

export const products = pgTable("products", {
    // id: varchar("id", { length: 255 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
    ...commonFields,
    image: varchar("image", { length: 500 }),
    name: varchar("name", { length: 255 }).notNull(),
    description: varchar("description", {length: 255}).notNull(),
    price: integer("price").notNull(),
});

export const productsRelations = relations(products, ({many}) => ({
    favorites: many(favorites),
    cart: many(cart)
}));

// export const users = pgTable("users", {
//     // id: varchar("id", { length: 255 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
//     ...commonFields,
//     name: varchar("name", { length: 255 }).notNull(),
//     email: varchar("email", { length: 255 }).notNull().unique(),
//     birthDate: timestamp("birth_date"),
// });

// export const userRelations = relations(users, ({many}) => ({
//     favorites: many(favorites),
//     cart: many(cart)
// }));

export const favorites = pgTable("favorites", {
    // id: varchar("id", { length: 255 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
    ...commonFields,
    userId: varchar("user_id", { length: 255 }).notNull(),
    productId: varchar("product_id", { length: 255 }).notNull().references(() => products.id),
    timeAdded: timestamp("time_added").defaultNow(),
});

// export const favoritesRelarions = relations(favorites, ({one}) => ({
//     user: one(users, {
//         fields: [favorites.userId],
//         references: [users.id],
//     }),
//     product: one(products, {
//         fields: [favorites.productId],
//         references: [products.id],
//     }),
// }));

export const cart = pgTable("cart", {
    ...commonFields,
    userId: varchar("user_id", { length: 255 }).notNull(),
    productId: varchar("product_id", { length: 255 }).notNull().references(() => products.id),
    quantity: integer("quantity").notNull().default(1),
});

// export const cartRelations = relations(cart, ({one}) => ({
//     user: one(users, {
//         fields: [cart.userId],
//         references: [users.id],
//     }),
//     product: one(products, {
//         fields: [cart.productId],
//         references: [products.id],
//     }),
// }));