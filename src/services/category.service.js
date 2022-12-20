const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class CategoryService {
    constructor () {}

    async find () {
        const categories = await models.Category.findAll();
        return categories;
    }

    async findOne (id) {
        const category = await models.Category.findByPk(id);
        if (!category) throw boom.notFound('category not found.');
        return category;
    }

    async create (data) {
        const newCategory = await models.Category.create(data);
        return newCategory
    }

    async update (id, data) {
        const category = await this.findOne(id);
        const updatedCategory = await category.update(data);
        return updatedCategory;
    }

    async delete (id) {
        const category = await this.findOne(id);
        await category.destroy();
        return id;
    }
}

module.exports = CategoryService;
