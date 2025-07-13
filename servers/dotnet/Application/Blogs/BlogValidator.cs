using Application.Blogs.DTOs;
using Application.Common;
using Application.Interfaces;

namespace Application.Blogs;

public class BlogValidator : IBlogValidator
{
    public List<ValidationError> Validate(CreateBlogDto blogDto)
    {
        List<ValidationError> errors = new List<ValidationError>();

        if (string.IsNullOrWhiteSpace(blogDto.Title))
        {
            errors.Add(new() { Field = "title", Message = "Blog must contain a title" });
        }
        if (string.IsNullOrWhiteSpace(blogDto.Body))
        {
            errors.Add(new() { Field = "body", Message = "Blog must contain a body" });
        }

        return errors;
    }
}
