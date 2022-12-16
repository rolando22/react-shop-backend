const router = require('express').Router();

const UserService = require('../services/user.service');
const { validatorHandler } = require('../middlewares/validator.handler');
const { 
    createUserSchema, 
    updatedUserSchema, 
    getUserSchema 
} = require('../schemas/user.schema');

const service = new UserService;

router.get('/', async (req, res, next) => {
    try {
        const users = await service.find();

        res.status(200).json({ data: users });
    } catch (error) {
        next(error);
    }
});

router.get('/:id', 
    validatorHandler(getUserSchema, 'params'), 
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const user = await service.findOne(id);
            
            res.status(200).json({ data: user });
        } catch (error) {
            next(error);
        }
    }
);

router.post('/', 
    validatorHandler(createUserSchema, 'body'), 
    async (req, res, next) => {
        try {
            const newUser = await service.create(req.body);

            res.status(201).json({ message: 'created', data: newUser });
        } catch (error) {
            next(error);
        }
    }
);

router.patch('/:id', 
    validatorHandler(getUserSchema, 'params'), 
    validatorHandler(updatedUserSchema, 'body'), 
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const updatedUser = await service.update(id, req.body);

            res.status(200).json({ message: 'updated', data: updatedUser });
        } catch (error) {
            next(error);
        }
    }
);

router.delete('/:id', 
    validatorHandler(getUserSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const deletedUserId = await service.delete(id);

            res.status(201).json({ message: 'deleted', data: deletedUserId });
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;
