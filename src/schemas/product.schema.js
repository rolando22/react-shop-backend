const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(15);
const price = Joi.number().strict().min(10);
const description = Joi.string().min(10);
const image = Joi.string().uri();
const categoryId = Joi.number().integer();

const limit = Joi.number().integer();
const offset = Joi.number().integer();

const createProductSchema = Joi.object({
    name: name.required(),
    price: price.required(),
    description: description.required(),
    image: image.required(),
    categoryId: categoryId.required(),
});

const updateProductSchema = Joi.object({
    name,
    price,
    description,
    image,
    categoryId,
});

const getProductSchema = Joi.object({
    id: id.required(),
});

const queryGetProductSchema = Joi.object({
    limit,
    offset,
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema, queryGetProductSchema };
