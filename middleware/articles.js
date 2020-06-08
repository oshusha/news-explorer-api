const objectId = require('mongodb').ObjectID;
const Article = require('../models/article');

async function getArticle(req, res, next) {
  if (objectId.isValid(req.params.id)) {
    const article = await Article.findById(req.params.id);
    res.article = article;
  }
  next();
}
module.exports = { getArticle };
