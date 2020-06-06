const { celebrate, Joi } = require('celebrate');

module.exports = {
    get: celebrate({
        params: Joi.object().keys({
            id: Joi.string().alphanum().length(24),
        }),
    }),

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
