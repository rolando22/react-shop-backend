const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class ProductService {

    constructor () {}

    async find (query) {
        const { limit, offset } = query;
        const products = await models.Product.findAll({
            include: ['category'],
            limit,
            offset,
        });
        return products;
    }

    async findOne (id) {
        const product = await models.Product.findByPk(id);;
        if (!product) throw boom.notFound('product not found');
        return product;
    }

    async create (data) {
        const newProduct = await models.Product.create(data);
        return newProduct;
    }

    async update (id, data) {
        const product = await this.findOne(id);
        const updatedProduct = await product.update(data);
        return updatedProduct;
    };

    async delete (id) {
        const product = await this.findOne(id);
        await product.destroy();
        return id;
    };
};

module.exports = ProductService;
