const router = require('express').Router();

const OrderService = require('../services/order.service')
const { validatorHandler } = require('../middlewares/validator.handler');
const { 
    createOrderSchema, 
    updateOrderSchema, 
    getOrderSchema,
    addItemSchema,  
} = require('../schemas/order.schema');

const service = new OrderService();

router.get('/', async (req, res, next) => {
    try {
        const orders = await service.find();
        res.status(200).json({ data: orders });
    } catch (error) {
        next(error);
    }
});

router.get('/:id', 
    validatorHandler(getOrderSchema, 'params'), 
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const order = await service.findOne(id);
            res.status(200).json({ data: order });
        } catch (error) {
            next(error);
        }
    }
);

router.post('/', 
    validatorHandler(createOrderSchema, 'body'), 
    async (req, res, next) => {
        try {
            const newOrder = await service.create(req.body);
            res.status(201).json({ message: 'created', data: newOrder });
        } catch (error) {
            next(error);
        }
    }
);

router.post('/add-item', 
    validatorHandler(addItemSchema, 'body'), 
    async (req, res, next) => {
        try {
            const newItem = await service.addItem(req.body);
            res.status(201).json({ message: 'add item success', data: newItem });
        } catch (error) {
            next(error);
        }
    }
);

router.patch('/:id', 
    validatorHandler(getOrderSchema, 'params'), 
    validatorHandler(updateOrderSchema, 'body'), 
    async (req, res, next) => {
        try {
            const { body , params: { id } } = req;
            const updatedOrder = await service.update(id, body);
            res.status(200).json({ message: 'update', data: updatedOrder });
        } catch (error) {
            next(error);
        }
    }
);

router.delete('/:id', 
    validatorHandler(getOrderSchema, 'params'), 
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const deletedOrderId = await service.delete(id);
            res.status(200).json({ message: 'deleted', data: deletedOrderId });
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;
