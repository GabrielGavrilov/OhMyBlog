using Application.Blogs;
using Application.Users.DTOs;
using Domain.Users;

namespace Application.Users.Assemblers;

public class UserAssembler
{
    private readonly BlogAssembler _blogAssembler = new BlogAssembler();

    public UserDto Assemble(User entity)
    {
        return new UserDto
        {
            Id = entity.Id,
            DisplayName = entity.DisplayName,
            Email = entity.Email,
            Blogs = entity.Blogs
                .Select(blog => _blogAssembler.Assemble(blog))
                .ToList()
        };
    }
}
