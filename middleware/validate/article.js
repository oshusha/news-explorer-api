const { celebrate, Joi } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);

module.exports = {
  get: celebrate({
    params: Joi.object().keys({
      id: Joi.objectId(),
    }),
  }),

  post: celebrate({
    body: Joi.object().keys({
      keyword: Joi.string().required(),
      title: Joi.string().required(),
      text: Joi.string().required(),
      source: Joi.string().required(),
      date: Joi.string().required(),
      link: Joi.string().required().regex(
        /^https?:\/\/(www\.)?([a-zA-Z-]{1,61}\.)?([a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]\.[a-zA-Z]{2,})/,
      ),
      image: Joi.string().required().regex(
        /^https?:\/\/(www\.)?([a-zA-Z-]{1,61}\.)?([a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]\.[a-zA-Z]{2,})/,
      ),
    }),
  }),
};
