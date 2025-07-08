using System;

namespace Application.Users.DTOs;

public class RegisterUserDto
{
    public required string DisplayName { get; set; }
    public required string Email { get; set; }
    public required string Password { get; set; }
}
