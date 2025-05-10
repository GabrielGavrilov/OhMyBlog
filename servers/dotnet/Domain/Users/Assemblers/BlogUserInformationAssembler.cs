using System;
using Domain;
using Domain.Users.DTOs;
using Domain.Users.Entities;

namespace Domain.Users.Assemblers;

public class BlogUserInformationAssembler
{
    public BlogUserInformationDto Assemble(User entity)
    {
        return new BlogUserInformationDto
        {
            Id = entity.Id,
            DisplayName = entity.DisplayName
        };
    }
}
