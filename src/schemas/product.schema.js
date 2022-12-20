const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(15);
const price = Joi.number().strict().min(10);
const description = Joi.string().min(10);
const image = Joi.string().uri();
const categortyId = Joi.number().integer();

const createProductSchema = Joi.object({
    name: name.required(),
    price: price.required(),
    description: description.required(),
    image: image.required(),
    categortyId: categortyId.required(),
});

const updateProductSchema = Joi.object({
    name,
    price,
    description,
    image,
    categortyId,
});

const getProductSchema = Joi.object({
    id: id.required(),
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema };
