const mongoose = require('mongoose');

const userModel = mongoose.model(
  'User',
  new mongoose.Schema({
    email: {
      type: String,
      required: true,
      unique: true,
    },
    displayName: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  })
);

module.exports = userModel;
