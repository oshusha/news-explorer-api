const Article = require('../models/article');
const NotFoundErr = require('../middleware/errors/not-found-err');
const ForbiddenErr = require('../middleware/errors/forbidden-err');
const BadRequestErr = require('../middleware/errors/bad-request-err');
const InternalServerErr = require('../middleware/errors/internal-server-err');

module.exports.get = async (req, res, next) => {
    try {
        const articles = await Article.find({ owner: req.user }).select('-__v');
        res.json({ data: articles });
    } catch (err) {
        next(new InternalServerErr(err.message));
    }
};

module.exports.post = async (req, res, next) => {
    const article = new Article({
        keyword: req.body.keyword,
        title: req.body.title,
        text: req.body.text,
        source: req.body.source,
        link: req.body.link,
        image: req.body.image,
        owner: req.user._id,
    });

    try {
        const newArticle = await article.save();
        res.status(201).json({ data: newArticle });
    } catch (err) {
        next(new BadRequestErr('Can\'t create the article'));
    }
};

module.exports.delete = async (req, res, next) => {
    try {
        if (res.article.owner.toString() === req.user._id) {
            await res.article.delete();
            res.json({ message: 'Successfully deleted' });
        } else {
            next(new ForbiddenErr('Permission denied'));
        }
    } catch (err) {
        next(new NotFoundErr('Invalid article id'));
    }
};
