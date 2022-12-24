const router = require('express').Router();

const categoriesRouter = require('./categories.router');
const customersRouter = require('./customer.router');
const productsRouter = require('./products.router');
const usersRouter = require('./users.router');
const ordersRouter = require('./order.router');

function routerApi (app) {
    app.use('/api/v1', router);
    router.use('/categories', categoriesRouter);
    router.use('/customers', customersRouter);
    router.use('/products', productsRouter);
    router.use('/users', usersRouter);
    router.use('/orders', ordersRouter)
};

module.exports = routerApi;
