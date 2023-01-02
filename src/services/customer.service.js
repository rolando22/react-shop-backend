const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class CustomerService {
    constructor () {}

    async find () {
        const customers = await models.Customer.findAll({ 
            attributes: {
                exclude: ['password'],
            },
            include: ['user'], 
        });
        return customers;
    }

    async findOne (id) {
        const customer = await models.Customer.findByPk(id, {
            attributes: {
                exclude: ['password'],
            },
        });
        if (!customer) throw boom.notFound('customer not found');
        return customer;
    }

    async create (data) {
        const newCustomer = await models.Customer.create(data, {
            include: ['user'],
        });
        delete newCustomer.user.dataValues.password;
        return newCustomer;
    }

    async update (id, changes) {
        const customer = await this.findOne(id);
        const updatedCustomer = await customer.update(changes);
        return updatedCustomer;
    }

    async delete (id) {
        const customer = await this.findOne(id);
        await customer.destroy();
        return id;
    }
}

module.exports = CustomerService;
