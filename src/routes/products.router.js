const router = require('express').Router();
const ProductService = require('../services/product.service');

const service = new ProductService();

router.get('/', async (req, res) => {
    const products = await service.find();

    res.status(200).json({ data: products });
});

router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await service.findOne(id);
    
        product 
            ? res.status(200).json({ data: product })
            : res.status(404).json({ message: 'not found' });
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res) => {
    const newProduct = await service.create(req.body);

    res.status(201).send({
        message: 'created',
        data: newProduct,
    });
});

router.patch('/:id', async (req, res) => {
    try {
        const { body, params: { id } } = req;
        const editProduct = await service.update(id, body);
    
        res.json({
            message: 'updated',
            data: editProduct,
            id,
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }

});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const idDeletedProduct = await service.delete(id);
    
        res.send({
            message: 'deleted',
            id: idDeletedProduct,
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

module.exports = router;
