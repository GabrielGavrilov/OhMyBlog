using System;
using Domain.Blogs.DTOs;

namespace Domain.Blogs.Validators;

public class BlogValidator
{
    public Dictionary<string, string> Validate(BlogDto blogDto)
    {
        Dictionary<string, string> errors = new Dictionary<string, string>();

        if (string.IsNullOrWhiteSpace(blogDto.Title))
        {
            errors.Add("title", "Blog must contain a title");
        }
        if (string.IsNullOrWhiteSpace(blogDto.Body))
        {
            errors.Add("body", "Blog must contain a body");
        }

        return errors;
    }
}
