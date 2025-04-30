using System;
using Application.Blogs.Assemblers;
using Application.Users.DTOs;
using Domain;

namespace Application.Users.Assemblers;

public class UserAssembler
{
    private readonly BlogAssembler BlogAssembler = new BlogAssembler();

    public UserDto Assemble(User entity)
    {
        return new UserDto
        {
            Id = entity.Id,
            DisplayName = entity.DisplayName,
            Email = entity.Email,
            Blogs = entity.Blogs
                .Select(blog => BlogAssembler.Assemble(blog))
                .ToList()
        };
    }
}
