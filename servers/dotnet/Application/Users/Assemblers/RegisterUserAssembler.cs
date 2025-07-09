using Application.Interfaces;
using Application.Users.DTOs;
using Domain.Users;

namespace Application.Users.Assemblers;

public class RegisterUserAssembler : IRegisterUserAssembler
{
    public User Disassemble(RegisterUserDto registerUserDto)
    {
        return new User
        {
            Email = registerUserDto.Email,
            UserName = registerUserDto.Email,
            DisplayName = registerUserDto.DisplayName
        };
    }
}
