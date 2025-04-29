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

    public List<BlogDto> Assemble(List<Blog> entities)
    {
        return entities
            .Select(entity => Assemble(entity))
            .ToList();
    }

    public Blog Disassemble(BlogDto blogDto) 
    {
        return Blog.NewInstance(blogDto.Title, blogDto.Body);
    }

    public Blog DisassembleInto(BlogDto blogDto, Blog entity)
    {
        entity.Title = blogDto.Title;
        entity.Body = blogDto.Body;
        return entity;
    }
}
