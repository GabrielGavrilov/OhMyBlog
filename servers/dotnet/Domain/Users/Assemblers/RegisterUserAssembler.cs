using Domain.Users.DTOs;
using Domain.Users.Entities;

namespace Domain.Users.Assemblers;

public class RegisterUserAssembler
{
    public User Disassemble(RegisterUserDto registerUserDto)
    {
        return User.NewInstance(registerUserDto.Email, registerUserDto.DisplayName);
    }
}
