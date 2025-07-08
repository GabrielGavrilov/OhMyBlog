using Application.Blogs;
using Application.Interfaces;
using Application.Users.DTOs;
using Domain.Users;

namespace Application.Users.Assemblers;

public class UserAssembler(IBlogAssembler blogAssembler) : IUserAssembler
{
    public UserDto Assemble(User entity)
    {
        return new UserDto
        {
            Id = entity.Id,
            DisplayName = entity.DisplayName!,
            Email = entity.Email!,
            Blogs = entity.Blogs
                .Select(blog => blogAssembler.Assemble(blog))
                .ToList()
        };
    }
}
