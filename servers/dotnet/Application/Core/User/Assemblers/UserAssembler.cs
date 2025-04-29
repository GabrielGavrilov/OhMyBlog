using System;
using Application.User.DTOs;
using Domain;

namespace Application.User.Assemblers;

public class UserAssembler
{
    public UserDto Assemble(Domain.User entity)
    {
        return new UserDto
        {
            Id = entity.Id,
            DisplayName = entity.DisplayName,
            Email = entity.Email
        };
    }
}
