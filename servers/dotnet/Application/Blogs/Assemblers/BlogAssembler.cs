using Application.Blogs.DTOs;
using Application.Interfaces;
using Application.Users.Assemblers;
using Domain.Blogs;

namespace Application.Blogs.Assemblers;

public class BlogAssembler(IBlogUserAssembler blogUserAssembler) : IBlogAssembler
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

    public List<BlogDto> Assemble(List<Blog> entities)
    {
        return entities
            .Select(entity => Assemble(entity))
            .ToList();
    }

}
