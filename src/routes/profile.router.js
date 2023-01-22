const router = require('express').Router();
const passport = require('passport');

const OrderService = require('../services/order.service');

const service = new OrderService();

router.get('/my-orders', 
    passport.authenticate('jwt', { session: false }), 
    async (req, res, next) => {
        try {
            const { user } = req;
            const orders = await service.findByUser(user.sub);
            res.json({ data: orders });
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;
