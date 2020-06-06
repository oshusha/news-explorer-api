const { celebrate, Joi } = require('celebrate');

module.exports = {
    get: celebrate({
        params: Joi.object().keys({
            id: Joi.string().alphanum().length(24),
        }),
    }),

    post: celebrate({
        body: Joi.object().keys({
            keyword: Joi.string().required(),
            title: Joi.string().required(),
            text: Joi.string().required(),
            source: Joi.string().required(),
            link: Joi.string().required().regex(
                /^https?:\/\/(www\.)?([a-zA-Z-]{1,61}\.)?([a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]\.[a-zA-Z]{2,})/,
            ),
            image: Joi.string().required().regex(
                /^https?:\/\/(www\.)?([a-zA-Z-]{1,61}\.)?([a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]\.[a-zA-Z]{2,})/,
            ),
        }),
    }),
};
