using System;
using Domain.Blogs.DTOs;

namespace Domain.Blogs.Validators;

public class BlogValidator
{
    public List<ValidationError> Validate(BlogDto blogDto)
    {
        List<ValidationError> errors = new List<ValidationError>();

        if (string.IsNullOrWhiteSpace(blogDto.Title))
        {
            errors.Add(new ValidationError { Field = "title", Message = "Blog must contain a title" });
        }
        if (string.IsNullOrWhiteSpace(blogDto.Body))
        {
            errors.Add(new ValidationError { Field = "body", Message = "Blog must contain a body" });
        }

        return errors;
    }
}
