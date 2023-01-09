const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class UserService {
    constructor () {};

    async find () {
        const users = await models.User.findAll({
            attributes: {
                exclude: ['password'],
            },
            include: ['customer'],
        });
        return users;
    }

    async findOne (id) {
        const user = await models.User.findByPk(id, {
            attributes: {
                exclude: ['password'],
            },
        });
        if (!user) throw boom.notFound('user not found');
        return user;
    }

    async findByEmail (email) {
        const user = await models.User.findOne({
            where: { email },
        });
        return user;
    }

    async create (data) {
        const newUser = await models.User.create(data);
        delete newUser.dataValues.password;
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
