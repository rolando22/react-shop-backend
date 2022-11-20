const router = require('express').Router();
const ProductService = require('../services/product.service');

const service = new ProductService();

router.get('/', (req, res) => {
    const products = service.find();

    res.status(200).json(products);
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const product = service.findOne(id);
    
    product 
        ? res.status(404).json({ message: 'not found' })
        : res.status(200).json(product);
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
