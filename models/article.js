const mongoose = require('mongoose');
const validator = require('validator');

const articleSchema = new mongoose.Schema({
    keyword: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30,
    },
    title: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30,
    },
    text: {
        type: String,
        required: true,
        minlength: 2,
    },
    date: {
        type: String,
        required: true,
        minlength: 2,
    },
    source: {
        type: String,
        required: true,
        minlength: 2,
    },
    link: {
        type: String,
        required: true,
        validate: {
            validator: (link) => validator.isURL(link),
        },
    },
    image: {
        type: String,
        required: true,
        validate: {
            validator: (link) => validator.isURL(link),
        },
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
        select: false,
    },
});

module.exports = mongoose.model('article', articleSchema);
