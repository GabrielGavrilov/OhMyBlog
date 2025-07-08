using Application.Users.DTOs;
using Domain.Users;

namespace Application.Users.Assemblers;

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
