const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class UserService {
    constructor () {};

    async find () {
        const users = await models.User.findAll({
            include: ['customer']
        });
        return users;
    }

    async findOne (id) {
        const user = await models.User.findByPk(id);
        if (!user) throw boom.notFound('user not found');
        return user;
    }

    async create (data) {
        const newUser = await models.User.create(data);
        return newUser;
    }

    async update (id, changes) {
        const user = await this.findOne(id);
        const updatedUser = await user.update(changes);
        return updatedUser;
    }

    async delete (id) {
        const user = await this.findOne(id);
        await user.destroy();
        return id;
    }
};

module.exports = UserService;
