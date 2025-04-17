const mongoose = require('mongoose');

const blogModel = mongoose.model(
  'Blog',
  new mongoose.Schema(
    {
      title: String,
      body: String,
      author: String,
    },
    { timestamps: true }
  )
);

module.exports = blogModel;
