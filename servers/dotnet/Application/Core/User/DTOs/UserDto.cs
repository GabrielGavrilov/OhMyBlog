using System;

namespace Application.User.DTOs;

public class UserDto
{
    public required string Id { get; set; }
    public string? DisplayName { get; set; }
    public string? Email { get; set; }
}
