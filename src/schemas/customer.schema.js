const Joi = require('joi');

const { createUserSchema } = require('./user.schema');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(30);
const lastName = Joi.string();
const phone = Joi.number().integer();
const userId = Joi.number().integer();

const createCustomerSchema = Joi.object({
    name: name.required(),
    lastName: lastName.required(),
    phone: phone.required(),
    user: createUserSchema,
});

const updatedCustomerSchema = Joi.object({
    name,
    lastName,
    phone,
    userId,
});

const getCustomerSchema = Joi.object({
    id: id.required(),
});

module.exports = { createCustomerSchema, updatedCustomerSchema, getCustomerSchema };
