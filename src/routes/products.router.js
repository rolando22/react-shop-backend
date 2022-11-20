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

    if (id === '999') 
        return res.status(404).json({ message: 'not found' });
    res.status(200).json({
        id: id,
        name: 'Product 1',
        price: 1000,
    });
});

router.post('/', (req, res) => {
    const body = req.body;

    res.status(201).send({
        message: 'created',
        data: body,
    });
});

router.patch('/:id', (req, res) => {
    const { body, params: { id } } = req;

    res.json({
        message: 'updated',
        data: body,
        id,
    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    res.send({
        message: 'deleted',
        id,
    });
});

module.exports = router;
