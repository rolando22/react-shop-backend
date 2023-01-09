const router = require('express').Router();

const CustomerService = require('../services/customer.service');
const { validatorHandler } = require('../middlewares/validator.handler');
const { 
    createCustomerSchema, 
    updatedCustomerSchema, 
    getCustomerSchema 
} = require('../schemas/customer.schema');

const service = new CustomerService();

router.get('/', async (req, res, next) => {
    try {
        const customers = await service.find();

        res.status(200).json({ data: customers });
    } catch (error) {
        next(error);
    }
});

router.get('/:id', 
    validatorHandler(getCustomerSchema, 'params'), 
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const customer = await service.findOne(id);

            res.status(200).json({ data: customer });
        } catch (error) {
            next(error);
        }
    }
);

router.post('/', 
    validatorHandler(createCustomerSchema, 'body'), 
    async (req, res, next) => {
        try {
            const newCustomer = await service.create(req.body);

            res.status(201).json({ message: 'created', data: newCustomer });
        } catch (error) {
            next(error)
        }
    }
);

router.patch('/:id', 
    validatorHandler(getCustomerSchema, 'params'), 
    validatorHandler(updatedCustomerSchema, 'body'), 
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const updatedCustomer = await service.update(id, req.body);

            res.status(200).json({ message: 'updated', data: updatedCustomer });
        } catch (error) {
            next(error);
        }
    }
);

router.delete('/:id', 
    validatorHandler(getCustomerSchema, 'params'), 
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const deletedCustomerId = await service.delete(id);

            res.status(200).json({ message: 'deleted', data: deletedCustomerId });
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;
