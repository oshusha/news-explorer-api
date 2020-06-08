const { celebrate, Joi } = require('celebrate');

module.exports = {
  posts: celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      password: Joi.string().required().min(8),
      email: Joi.string().required().email(),
    }),
  }),

  sign: celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),

};
