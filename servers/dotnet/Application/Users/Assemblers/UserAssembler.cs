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
            Email = entity.Email!,
            DisplayName = entity.DisplayName!,
            Description = entity.Description,
        };
    }

    public User DisassembleInto(UserDto userDto, User entity)
    {
        entity.Description = userDto.Description;
        return entity;
    }
}
