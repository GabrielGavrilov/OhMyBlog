const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

async function getUserInformation(req, res) {
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
    return res.status(200).json({
      _id: user._id,
      email: user.email,
      displayName: user.displayName,
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(401);
  }
}

async function loginUser(req, res) {
  const loginPayload = ({ email, password } = req.body);
  const user = await User.findOne({
    email: loginPayload.email,
    password: loginPayload.password,
  });

  if (!user) {
    return res.status(401).json({
      message: 'Email or password is incorrect.',
    });
  }

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY);
  res.cookie('jwt', token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  });

  return res.status(200).json(token);
}

async function createUser(req, res) {
  const userPayload = ({ email, displayName, password } = req.body);

  const user = new User({
    email: userPayload.email,
    displayName: userPayload.displayName,
    password: userPayload.password,
  });

  await user
    .save()
    .then(function () {
      console.log('A new user has signed up.');
      return res.status(200).json(user);
    })
    .catch(function (err) {
      console.log(err);
      return res.sendStatus(500);
    });
}

function logoutUser(req, res) {
  res.cookie('jwt', '', {
    maxAge: 0,
  });
  return res.sendStatus(204);
}

module.exports = {
  getUserInformation,
  loginUser,
  createUser,
  logoutUser,
};
