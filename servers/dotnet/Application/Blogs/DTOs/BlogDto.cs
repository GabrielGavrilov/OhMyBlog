using System;

namespace Application.Blogs.DTOs;

public class BlogDto
{
    public string? Id { get; set; }
    public required string Title { get; set; }   
    public required string Body { get; set; }
}
