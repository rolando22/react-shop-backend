const router = require('express').Router();
const ProductService = require('../services/product.service');

const service = new ProductService();

router.get('/', (req, res) => {
    const products = service.find();

    res.status(200).json({ data: products });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const product = service.findOne(id);

    product 
        ? res.status(200).json({ data: product })
        : res.status(404).json({ message: 'not found' });
});

router.post('/', (req, res) => {
    const newProduct = service.create(req.body);

    res.status(201).send({
        message: 'created',
        data: newProduct,
    });
});

router.patch('/:id', (req, res) => {
    const { body, params: { id } } = req;
    const editProduct = service.update(id, body);

    res.json({
        message: 'updated',
        data: editProduct,
        id,
    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const idDeletedProduct = service.delete(id);

    res.send({
        message: 'deleted',
        id: idDeletedProduct,
    });
});

module.exports = router;
