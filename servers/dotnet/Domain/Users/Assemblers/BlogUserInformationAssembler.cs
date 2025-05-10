using System;
using Application.Core.Users.DTOs;
using Domain;

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
