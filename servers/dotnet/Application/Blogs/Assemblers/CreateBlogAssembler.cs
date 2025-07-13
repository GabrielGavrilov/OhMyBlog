using System;
using Application.Blogs.DTOs;
using Application.Interfaces;
using Application.Users.Assemblers;
using Domain.Blogs;

namespace Application.Blogs.Assemblers;

public class CreateBlogAssembler(IBlogUserAssembler blogUserAssembler) : ICreateBlogAssembler
{
    public BlogDto Assemble(Blog entity)
    {
        return new BlogDto
        {
            Id = entity.Id,
            Title = entity.Title,
            Body = entity.Body,
            CreatedAt = entity.CreatedAt,
            User = blogUserAssembler.Assemble(entity.User)
        };
    }
    
    public Blog Disassemble(CreateBlogDto blogDto, string userId)
    {
        return new Blog
        {
            Title = blogDto.Title,
            Body = blogDto.Body,
            UserId = userId
        };
    }

    public Blog DisassembleInto(CreateBlogDto blogDto, Blog entity)
    {
        entity.Title = blogDto.Title;
        entity.Body = blogDto.Body;
        return entity;
    }
}
