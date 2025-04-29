using System;
using Application;
using Application.User.DTOs;
using Domain;

namespace Application.User.Assemblers;

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
