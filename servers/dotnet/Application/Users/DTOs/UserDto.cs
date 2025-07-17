using System;
using Application.Blogs.DTOs;

namespace Application.Users.DTOs;

public class UserDto
{
    public required string Id { get; set; }
    public required string Email { get; set; }
    public required string DisplayName { get; set; }
    public string? Description { get; set; }
}
