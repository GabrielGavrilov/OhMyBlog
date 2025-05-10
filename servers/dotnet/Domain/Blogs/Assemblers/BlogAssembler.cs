using Domain.Blogs.DTOs;
using Domain.Blogs.Entities;
using Domain.Users.Assemblers;

namespace Domain.Blogs.Assemblers;

public class BlogAssembler
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

    public Blog Disassemble(BlogDto blogDto) 
    {
        return Blog.NewInstance(blogDto.Title, blogDto.Body, blogDto.UserId!);
    }

    public Blog DisassembleInto(BlogDto blogDto, Blog entity)
    {
        entity.Title = blogDto.Title;
        entity.Body = blogDto.Body;
        return entity;
    }
}
