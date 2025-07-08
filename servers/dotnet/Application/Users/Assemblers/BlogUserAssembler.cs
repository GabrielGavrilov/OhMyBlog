using Application.Interfaces;
using Application.Users.DTOs;
using Domain.Users;

namespace Application.Users.Assemblers;

public class BlogUserAssembler : IBlogUserAssembler
{
    public BlogUserDto Assemble(User entity)
    {
        return new BlogUserDto
        {
            Id = entity.Id,
            DisplayName = entity.DisplayName!
        };
    }
}
