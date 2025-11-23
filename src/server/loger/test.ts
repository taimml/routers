import { 
    createUser, 
    deleteUser, 
    updateUser, 
    getUsers, 
    getUsersWithFavoritesProducts, 
    createProduct, 
    deleteProduct, 
    addToFavorites, 
    getUserFavorites,
    removeFromFavorites,
    addToCart,
    getUserCart,
    removeFromCart

} from "./functions";

async function testFunctions() {
    try {
        const user1 = await createUser({
            name: "Ivan",
            email: "ehznla@mail.ru",
            birthDate: new Date("2008-11-25")
        });
        console.log("Создан ", user1);

        const user2 = await createUser({
            name: "Masha",
            email: "rmghst@mail.ru",
            birthDate: new Date("2007-02-18")
        });
        console.log("Создан", user2);

        const user3 = await createUser({
            name: "Ilya",
            email: "dhsudaj@mail.ru",
            birthDate: new Date("1999-10-23")
        });
        console.log("Создан: ", user3);

        const user4 = await createUser({
            name: "Anna",
            email: "anna67892@mail.ru", 
            birthDate: new Date("1995-05-15")
        });
        console.log("Создан:", user4.name);

        const user5 = await createUser({
            name: "Dmitry",
            email: "dwjkwffs@mail.ru",
            birthDate: new Date("2000-08-30")
        });
        console.log("Создан:", user5.name);

        const user6 = await createUser({
            name: "Olga",
            email: "qqkqkkkkk@mail.ru",
            birthDate: new Date("1992-12-10")
        });
        console.log("Создан:", user6.name);

        const deletedUser = await deleteUser(user2.id);
        console.log('Удален:', deletedUser);

        const updatedUser = await updateUser(user1.id, {
            name: "Misha"
        });
        console.log("Обновлен: ", updatedUser)

        const users = await getUsers();
        console.log('Все пользователи:', users);



        const product1 = await createProduct({
            image: "shirt.png",
            name: "shirt",
            description: "n jdfjd njdn jdnjcndjcnj jdn vndjvnjdcnjd j njd nvjk"
        })
        console.log("Создан: ", product1)

        const product2 = await createProduct({
            image: "jeans.png",
            name: "jeans",
            description: "sjkf jjkfbs jbsfhu byfhijs"
        })
        console.log("Создан: ", product2)

        const product3 = await createProduct({
            image: "jacket.png",
            name: "jacket", 
            description: "dbhadawnj bjjwef enfleen"
        })
        console.log("Создан: ", product3)

        const product4 = await createProduct({
            image: "shoes.png",
            name: "shoes",
            description: "fav abafb dawmf a"
        })
        console.log("Создан: ", product4)

        const product5 = await createProduct({
            image: "hat.png", 
            name: "hat",
            description: "asdja kakml pe"
        })
        console.log("Создан: ", product5)

        const product6 = await createProduct({
            image: "dress.png",
            name: "dress", 
            description: "fbsjn ks slls  bhsjopf llmsl fld"
        })
        console.log("Создан: ", product6)

        const deletedProduct = await deleteProduct(product1.id);
        console.log("Удален: ", deletedProduct)




        await addToFavorites(user1.id, product1.id);
        await addToFavorites(user1.id, product2.id);
        await addToFavorites(user2.id, product1.id);
        console.log('Добавлено в избранное!');

        const user1Favorites = await getUserFavorites(user1.id);
        console.log('Избранное пользователя', user1.name + ':', user1Favorites.length, 'товар/ов');

        await addToCart(user1.id, product1.id, 2);
        await addToCart(user1.id, product2.id, 1);
        await addToCart(user2.id, product1.id, 3);
        console.log('Добавлено в корзину!');

        const user1Cart = await getUserCart(user1.id);
        console.log('Корзина пользователя', user1.name + ':', user1Cart.length, 'товаров');

        const usersWithFavoritesProducts = await getUsersWithFavoritesProducts();
        usersWithFavoritesProducts.forEach((user, index) => {
            if (user.favorites.length > 0) {
                console.log(`${index + 1}. ${user.name}`);
                console.log(`Избранных товаров: ${user.favorites.length}`);

                user.favorites.forEach(fav => {
                    console.log(`ID: ${fav.product.id}`);
                    console.log(`Товар: ${fav.product.name}`);
                    console.log(`Описание: ${fav.product.description}`);
                    console.log(`Добавлен: ${fav.timeAdded}`);
                });
                console.log();
            }
        })
        console.log("Пользователи с их избранными товарами: ", usersWithFavoritesProducts)

        await removeFromFavorites(user1.id, product1.id);
        console.log('Удалено из избранного!');

        await removeFromCart(user1.id, product1.id);
        console.log('Удалено из корзины!');
    }
    catch (error) {
        console.error("Ошибка: ", error);
    }
}

testFunctions();