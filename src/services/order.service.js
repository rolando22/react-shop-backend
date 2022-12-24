const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class OrderService {
    constructor () {}

    async find () {
        const orders = await models.Order.findAll();
        return orders;
    }

    async findOne (id) {
        const order = await models.Order.findByPk(id, { 
            include: [{
                association: 'customer',
                include: ['user'],
            }] ,
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
}

module.exports = OrderService;
