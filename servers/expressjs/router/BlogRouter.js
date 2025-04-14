const express = require("express");
const router = express.Router();
const controller = require("../controllers/BlogController");

router.get("/", controller.getAllBlogs);
router.get("/:id", controller.findBlogById);

router.post("/", controller.createBlog);

router.put("/:id", controller.updateBlog);

router.delete("/:id", controller.deleteBlog);

module.exports = router;
