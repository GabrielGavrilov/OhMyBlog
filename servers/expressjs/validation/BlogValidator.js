module.exports = function blogValidator(blog) {
  const errors = [];

  if (blog.title === '') {
    errors.push({
      field: 'title',
      message: 'Blog must contain a title.',
    });
  }

  if (blog.title.length > 120) {
    errors.push({
      field: 'title',
      message: 'Blog title cannot exceed 120 characters.',
    });
  }

  if (blog.body === '') {
    errors.push({
      field: 'body',
      message: 'Blog must contain a body.',
    });
  }

  return errors;
};
