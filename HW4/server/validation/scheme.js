const Joi = require('joi');

const idScheme = Joi.object({
    id: Joi.number().required()
});

const userScheme = Joi.object({
    firstName: Joi.string().min(2).required(),
    lastName: Joi.string().min(2).required(),
    age: Joi.number().min(1).max(200).required(),
    city: Joi.string().min(2).max(40)
});

module.exports = { idScheme, userScheme };