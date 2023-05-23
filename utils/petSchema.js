const Joi = require('joi');

module.exports.errorSchema = Joi.object({
    name: Joi.string().required(),
    image: Joi.string(),
    breed: Joi.string().required(),
    age: Joi.number()
        .integer()
        .min(0)
        .max(10)
        .required(),
    price: Joi.number().min(0).required(),
    category: Joi.string().required()
  });