const Blog = require('../models/BlogModel');
const blogValidator = require('../validation/BlogValidator');

async function getAllBlogs(req, res) {
  const blogs = await Blog.find({}).sort({ createdAt: -1 });
  return res.status(200).json(blogs);
}

async function findBlogById(req, res) {
  const id = req.params.id;
  const blog = await Blog.findById(id);

  if (!blog) {
    return res.sendStatus(404);
  }

  return res.status(200).json(blog);
}

async function createBlog(req, res) {
  const user = res.locals.user;
  const blogPayload = ({ title, body } = req.body);
  const errors = blogValidator(blogPayload);

  if (errors.length > 0) {
    return res.status(400).json(errors);
  }

  const blog = new Blog({
    title: title,
    body: body,
    author: user.displayName,
  });

  await blog
    .save()
    .then(function () {
      console.log('Blog has been created.');
      return res.status(200).json(blog);
    })
    .catch(function (err) {
      console.log(err);
      return res.sendStatus(500);
    });
}

async function updateBlog(req, res) {
  const user = res.locals.user;
  const blogPayload = ({ title, body } = req.body);
  const errors = blogValidator(blogPayload);

  if (errors.length > 0) {
    return res.status(400).json(errors);
  }

  const id = req.params.id;
  const findBlog = { _id: id };
  const foundBlog = await Blog.findById(id);
  const updateBlog = {
    title: title,
    body: body,
  };

  if (!foundBlog) {
    return res.sendStatus(404);
  }

  if (foundBlog.author !== user.displayName) {
    return res.sendStatus(401);
  }

  await Blog.findOneAndUpdate(findBlog, updateBlog)
    .then(async function () {
      console.log('Blog has been updated.');
      const blog = await Blog.findById(id);
      return res.status(200).json(blog);
    })
    .catch(function (err) {
      console.log(err);
      return res.sendStatus(500);
    });
}

async function deleteBlog(req, res) {
  const user = res.locals.user;
  const id = req.params.id;
  const blog = await Blog.findById(id);

  if (blog.author !== user.displayName) {
    return res.sendStatus(401);
  }

  await Blog.deleteOne({ _id: id });
  console.log('Blog has been deleted.');
  return res.sendStatus(204);
}

module.exports = {
  getAllBlogs,
  findBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
};
