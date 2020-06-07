const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequestErr = require('../middleware/errors/bad-request-err');
const AuthorizationErr = require('../middleware/errors/authorization-err');
const ConflictErr = require('../middleware/errors/conflict-err');


module.exports.get = async (req, res, next) => {
  try {
    const users = await User.findById(req.user._id).select('-_id').select('-__v');
    await res.json({ data: users });
  } catch (err) {
    next(new Error(err.message));
  }
};

module.exports.post = async (req, res, next) => {
  try {
    if (req.body.password.length < 8) {
      next(new BadRequestErr('Password must be at least 8 characters'));
    } else {
      const saltRounds = 10;
      const cpassword = await bcrypt.hash(req.body.password, saltRounds);
      const user = new User({
        name: req.body.name,
        password: cpassword,
        email: req.body.email,
      });

      await user.save();
      await res.status(201).json({ message: 'Registration successful' });
    }
  } catch (err) {
    next(new ConflictErr('Email address already registered'));
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findUserByCredentials(email, password);
    const token = jwt.sign({ _id: user._id }, process.env.JWTSECRET || 'defone', { expiresIn: '7d' });
    await res.cookie('jwt', token, { httpOnly: true, maxAge: 604800 * 1000 });
    await res.send({ message: 'Successful authorization' });
  } catch (err) {
    next(new AuthorizationErr('Incorrect email or password'));
  }
};
