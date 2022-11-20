const router = require('express').Router();

const categoriesRouter = require('./categories.router');
const productsRouter = require('./products.router');
const usersRouter = require('./users.router');

function routerApi (app) {
    app.use('/api/v1', router);
    router.use('/categories', categoriesRouter);
    router.use('/products', productsRouter);
    router.use('/users', usersRouter);
};

module.exports = routerApi;
