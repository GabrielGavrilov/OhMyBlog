using Application.Users.DTOs;
using Domain.Users;

namespace Application.Users.Assemblers;

public class RegisterUserAssembler
{
    public User Disassemble(RegisterUserDto registerUserDto)
    {
        return User.NewInstance(registerUserDto.Email, registerUserDto.DisplayName);
    }
}
