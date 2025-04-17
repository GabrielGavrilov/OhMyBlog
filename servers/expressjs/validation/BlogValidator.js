module.exports = function blogValidator(blog) {
  const errors = [];

  if (blog.title === '') {
    errors.push({
      title: 'Blog must contain a title.',
    });
  }

  if (blog.title.length > 120) {
    errors.push({
      title: 'Blog title cannot exceed 120 characters.',
    });
  }

  if (blog.body === '') {
    errors.push({
      body: 'Blog must contain a body.',
    });
  }

  return errors;
};
