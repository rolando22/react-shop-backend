const router = require('express').Router();

const ProductService = require('../services/product.service');
const { validatorHandler } = require('../middlewares/validator.handler');
const { 
    createProductSchema, 
    updateProductSchema, 
    getProductSchema, 
    queryGetProductSchema, 
} = require('../schemas/product.schema');

const service = new ProductService();

router.get('/', 
    validatorHandler(queryGetProductSchema, 'query'), 
    async (req, res, next) => {
        try {
            const products = await service.find(req.query);
            res.status(200).json({ data: products });
        } catch (error) {
            next(error);
        }
});

router.get('/:id', 
    validatorHandler(getProductSchema, 'params'), 
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const product = await service.findOne(id);
            res.status(200).json({ data: product });
        } catch (error) {
            next(error);
        };
    }
);

router.post('/', 
    validatorHandler(createProductSchema, 'body'), 
    async (req, res, next) => {
        try {
            const newProduct = await service.create(req.body);
            res.status(201).send({ message: 'created', data: newProduct });
        } catch (error) {
            next(error);
        }
    }
);

router.patch('/:id', 
    validatorHandler(getProductSchema, 'params'), 
    validatorHandler(updateProductSchema, 'body'), 
    async (req, res, next) => {
        try {
            const { body, params: { id } } = req;
            const editProduct = await service.update(id, body);
            res.json({ message: 'updated', data: editProduct });
        } catch (error) {
            next(error);
        };
    }
);

router.delete('/:id',
    validatorHandler(getProductSchema, 'params'), 
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const idDeletedProduct = await service.delete(id);
            res.send({ message: 'deleted', id: idDeletedProduct });
        } catch (error) {
            next(error);
        };
    }
);

module.exports = router;
