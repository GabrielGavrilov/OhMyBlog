const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

module.exports = async function auth(req, res, next) {
  try {
    const cookie = req.cookies['jwt'];

    if (!cookie) {
      return res.sendStatus(401);
    }

    const auth = jwt.verify(cookie, process.env.JWT_SECRET_KEY);

    if (!auth) {
      return res.sendStatus(401);
    }

    const user = await User.findById(auth._id);
    res.locals.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(401);
  }
};
