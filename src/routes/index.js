const categoriesRouter = require('./categories.router');
const homeRouter = require('./home.router');
const productsRouter = require('./products.router');
const usersRouter = require('./users.router');

function routerApi (app) {
    app.use('/categories', categoriesRouter);
    app.use('/', homeRouter);
    app.use('/products', productsRouter);
    app.use('/users', usersRouter);
};

module.exports = routerApi;
