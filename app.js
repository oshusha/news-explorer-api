require('dotenv').config();
const express = require('express');

const http = express();
const helmet = require('helmet');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const limiter = require('./middleware/rate');
const router = require('./router/index');
const error = require('./middleware/errors/error');
const { requestLogger, errorLogger } = require('./middleware/logger');

http.use(helmet());
http.use(limiter);
http.use(bodyParser.json());
http.use(cookieParser());

http.use(requestLogger);
http.use(router);
http.use(errorLogger);

http.use(errors());
http.use(error);

try {
  mongoose.connect(process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/news', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  });
  console.log('connected to db');
} catch (err) {
  console.log(err);
}

try {
  http.listen(process.env.PORT || 3000);
  console.log('http is up and running');
} catch (err) {
  console.log(err);
}
