const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');
const ProductService = require('./product.service');

const productService = new ProductService();

class OrderService {
    constructor () {}

    async find () {
        const orders = await models.Order.findAll();
        return orders;
    }

    async findOne (id) {
        const order = await models.Order.findByPk(id, { 
            include: [
                {
                    association: 'customer',
                    include: ['user'],
                },
                'items',
            ],
        });
        if (!order) throw boom.notFound('not found');
        return order;
    }

    async create (data) {
        const newOrder = await models.Order.create(data);
        return newOrder;
    }

    async update (id, data) {
        const order = await this.findOne(id);
        const updatedOrder = await order.update(data);
        return updatedOrder;
    }

    async delete (id) {
        const order = await this.findOne(id);
        await order.destroy();
        return id;
    }

    async addItem (data) {
        await this.findOne(data.orderId);
        await productService.findOne(data.productId);
        const newItem = await models.OrderProduct.create(data);
        return newItem;
    }
}

module.exports = OrderService;
