const express = require('express');
const faker = require('faker');

const app = express();
const port = 3001;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/products', (req, res) => {
    const products = [];
    const { limit = 10 } = req.query;

    for (let index = 0; index < limit; index++) {
        products.push({
            name: faker.commerce.productName(),
            price: faker.commerce.price(),
            image: faker.image.imageUrl(),
        });
    };
    res.json(products);
});

app.get('/products/:id', (req, res) => {
    const { id } = req.params;
    res.json({
        id: id,
        name: 'Product 1',
        price: 1000,
    });
});

app.get('/users', (req, res) => {
    const { limit, offset } = req.query;

    if (limit && offset) return res.json({ limit, offset });
    res.send('No hay parámetros');
});

app.get('/categories/:categoryId/products/:productId', (req, res) => {
    const { categoryId, productId } = req.params;
    res.json({
        categoryId: categoryId,
        productId: productId,
    });
});

app.listen(port, () => {
    console.log(`Listening at http://localhost: ${port}`);
});
