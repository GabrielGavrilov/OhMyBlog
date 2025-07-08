using Application.Blogs.DTOs;
using Application.Interfaces;
using Application.Users.Assemblers;
using Domain.Blogs;

namespace Application.Blogs;

public class BlogAssembler : IBlogAssembler
{
    private readonly BlogUserInformationAssembler _blogUserInformationAssembler = new BlogUserInformationAssembler();

    public BlogDto Assemble(Blog entity) 
    {
        return new BlogDto 
        {
            Id = entity.Id,
            Title = entity.Title,
            Body = entity.Body,
            CreatedAt = entity.CreatedAt,
            User = _blogUserInformationAssembler.Assemble(entity.User)
        };
    }

    public List<BlogDto> Assemble(List<Blog> entities)
    {
        return entities
            .Select(entity => Assemble(entity))
            .ToList();
    }

    public Blog Disassemble(BlogDto blogDto, string userId)
    {
        return new Blog
        {
            Title = blogDto.Title,
            Body = blogDto.Body,
            UserId = userId
        };
    }

    public Blog DisassembleInto(BlogDto blogDto, Blog entity)
    {
        entity.Title = blogDto.Title;
        entity.Body = blogDto.Body;
        return entity;
    }
}
