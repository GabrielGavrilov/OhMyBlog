using System;
using Application.Users.DTOs;
using Domain;

namespace Application.Users.Assemblers;

public class UserAssembler
{
    public UserDto Assemble(User entity)
    {
        return new UserDto
        {
            Id = entity.Id,
            DisplayName = entity.DisplayName,
            Email = entity.Email
        };
    }
}
