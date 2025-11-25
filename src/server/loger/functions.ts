import { desc, eq, isNull, and } from "drizzle-orm";
import { db } from "../db";
import { users, products, favorites, cart } from "../db/schema";


export async function createUser(userData: {
    name: string;
    email: string;
    birthDate: Date;
}) {
    const [newUser] = await db.insert(users).values(userData).returning();
    return newUser;
}

export async function deleteUser(id: string) {
    const [deletedUser] = await db
        .update(users)
        .set({
            deletedAt: new Date()
        })
        .where(eq(users.id, id))
        .returning();
    return deletedUser;
}

export async function updateUser(id: string, userData: {
    name?: string;
    email?: string;
    birthDate?: Date;
}) {
    const [updatedUser] = await db
        .update(users)
        .set(userData)
        .where(eq(users.id, id))
        .returning();
    return updatedUser;
}

export async function getUsers() {
    return await db.query.users.findMany({
        where: isNull(users.deletedAt),
        orderBy: desc(users.createdAt)
    });
}




export async function createProduct(productData: {
    image: string;
    name: string;
    description: string;
    price: number;
}) {
    const [newProduct] = await db.insert(products).values(productData).returning();
    return newProduct;
}

export async function deleteProduct(id: string) {
    const [deletedProduct] = await db
        .update(products)
        .set({
            deletedAt: new Date()
        })
        .where(eq(products.id, id))
        .returning();

    await db
        .update(favorites)
        .set({
            deletedAt: new Date()
        })
        .where(eq(favorites.productId, id));

    return deletedProduct;
}

export async function updateProducts(id: string, productData: {
    image?: string;
    name?: string;
    description?: string;
}) {
    const [updatedProduct] = await db
        .update(products)
        .set(productData)
        .where(eq(products.id, id))
        .returning()
    return updatedProduct;
}

export async function getProducts() {
    return await db.query.products.findMany({
        where: isNull(products.deletedAt),
    });
}





export async function addToFavorites(userId: string, productId: string) {
    const created = await db.insert(favorites).values({
        userId: userId,
        productId: productId
    }).returning()
    return created[0]
}

export async function getUserFavorites(userId: string) {
    return await db.select().from(favorites).where(eq(favorites.userId, userId))
}

export async function removeFromFavorites(userId: string, productId: string) {
    const deleted = await db.delete(favorites).where(and(
        eq(favorites.userId, userId),
        eq(favorites.productId, productId)
    )).returning()
    return deleted[0]
}




export async function addToCart(userId: string, productId: string, quantity: number) {
    const created = await db.insert(cart).values({
        userId: userId,
        productId: productId,
        quantity: quantity
    }).returning()
    return created[0]
}

export async function getUserCart(userId: string) {
    return await db.select().from(cart).where(eq(cart.userId, userId))
}

export async function removeFromCart(userId: string, productId: string) {
    const deleted = await db.delete(cart).where(and(
        eq(cart.userId, userId),
        eq(cart.productId, productId)
    )).returning()
    return deleted[0]
}


export async function getUsersWithFavoritesProducts() {
    return await db.query.users.findMany({
        with: {
            favorites: {
                with: {
                    product: true
                },
                where: isNull(favorites.deletedAt)
            },
        },
    });
};