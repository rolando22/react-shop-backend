const router = require('express').Router();
const faker = require('faker');

router.get('/', (req, res) => {
    const products = [];
    const { limit = 10 } = req.query;

    for (let index = 0; index < limit; index++) {
        products.push({
            name: faker.commerce.productName(),
            price: parseInt(faker.commerce.price(), 10),
            image: faker.image.imageUrl(),
        });
    };
    res.json(products);
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    res.json({
        id: id,
        name: 'Product 1',
        price: 1000,
    });
});

module.exports = router;
