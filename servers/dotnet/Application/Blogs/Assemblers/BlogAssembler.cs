using System;
using Application.Blogs.DTOs;
using Domain;

namespace Application.Blogs.Assemblers;

public class BlogAssembler
{
    public BlogDto Assemble(Blog entity) 
    {
        return new BlogDto 
        {
            Id = entity.Id,
            Title = entity.Title,
            Body = entity.Body
        };
    }

    public Blog Disassemble(BlogDto blogDto) 
    {
        return Blog.NewInstance(blogDto.Title, blogDto.Body);
    }
}
