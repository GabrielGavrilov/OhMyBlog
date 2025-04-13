const Blog = require("../models/BlogModel");

async function getAllBlogs(req, res) {
  const blogs = await Blog.find({});
  return res.status(200).json(blogs);
}

async function findBlogById(req, res) {
  const id = req.params.id;
  const blog = await Blog.findById(id);

  if (!blog) return res.sendStatus(404);

  return res.status(200).json(blog);
}

async function createBlog(req, res) {
  const { title, body } = req.body;

  const blog = new Blog({
    title: title,
    body: body,
  });

  await blog
    .save()
    .then(function () {
      console.log("Blog has been created.");
      return res.status(200).json(blog);
    })
    .catch(function (err) {
      console.log(err);
      return res.sendStatus(400);
    });
}

async function updateBlog(req, res) {
  const { title, body } = req.body;
  const id = req.params.id;
  const findBlog = { _id: id };
  const foundBlog = await Blog.findById(id);
  const updateBlog = {
    title: title,
    body: body,
  };

  if (!foundBlog) return res.sendStatus(404);

  await Blog.findOneAndUpdate(findBlog, updateBlog)
    .then(async function () {
      console.log("Blog has been updated.");
      const blog = await Blog.findById(id);
      return res.status(200).json(blog);
    })
    .catch(function (err) {
      console.log(err);
      return res.sendStatus(400);
    });
}

async function deleteBlog(req, res) {
  const id = req.params.id;
  await Blog.deleteOne({ _id: id });
  console.log("Blog has been deleted.");
  return res.sendStatus(204);
}

module.exports = {
  getAllBlogs,
  findBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
};
