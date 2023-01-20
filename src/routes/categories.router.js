const router = require('express').Router();
const passport = require('passport');

const CategoryService = require('../services/category.service');
const { validatorHandler } = require('../middlewares/validator.handler');
const { 
    createCategorySchema, 
    updateCategorySchema, 
    getCategorySchema 
} = require('../schemas/category.schema');

const service = new CategoryService();

router.get('/', async (req, res, next) => {
    try {
        const categories = await service.find();
        res.status(200).json({ data: categories });
    } catch (error) {
        next(error);
    }
});

router.get('/:id', 
    validatorHandler(getCategorySchema, 'params'), 
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const category = await service.findOne(id);
            res.status(200).json({ data: category });
        } catch (error) {
            next(error);
        }
    }
);

router.post('/', 
    passport.authenticate('jwt', { session: false }), 
    validatorHandler(createCategorySchema, 'body'), 
    async (req, res, next) => {
        try {
            const newCategory = await service.create(req.body);
            res.status(201).json({ message: 'created', data: newCategory });
        } catch (error) {
            next(error);
        }
    }
);

router.patch('/:id', 
    validatorHandler(getCategorySchema, 'params'), 
    validatorHandler(updateCategorySchema, 'body'), 
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const updatedCategory = await service.update(id, req.body);
            res.status(200).json({ message: 'updated', data: updatedCategory });
        } catch (error) {
            next(error)
        }
    }
);

router.delete('/:id', 
    validatorHandler(getCategorySchema, 'params'), 
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const deletedCategoryId = await service.delete(id);
            res.status(200).json({ message: 'deleted', data: deletedCategoryId });
        } catch (error) {
            next(error)
        }
    }
);

module.exports = router;
