using System;
using Domain.Blogs.DTOs;

namespace Domain.Users.DTOs;

public class UserDto
{
    public required string Id { get; set; }
    public string? DisplayName { get; set; }
    public string? Email { get; set; }
    public ICollection<BlogDto> Blogs {get; set;} = [];
}
