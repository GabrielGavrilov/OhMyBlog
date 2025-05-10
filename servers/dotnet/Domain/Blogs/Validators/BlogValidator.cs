using System;
using Application.Blogs.DTOs;

namespace Domain.Blogs.Validators;

public class BlogValidator
{
    public Dictionary<string, string> Validate(BlogDto blogDto)
    {
        Dictionary<string, string> errors = new Dictionary<string, string>();

        if (string.IsNullOrEmpty(blogDto.Title))
        {
            errors.Add("title", "Blog must contain a title.");
        }
        if (string.IsNullOrEmpty(blogDto.Body))
        {
            errors.Add("body", "Blog must contain a body.");
        }

        return errors;
    }
}
