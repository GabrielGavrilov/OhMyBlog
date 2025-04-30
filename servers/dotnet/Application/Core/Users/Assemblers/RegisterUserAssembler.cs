using System;
using Application.Users.DTOs;
using Domain;

namespace Application.Core.Users.Assemblers;

public class RegisterUserAssembler
{
    public User Disassemble(RegisterUserDto registerUserDto)
    {
        return User.NewInstance(registerUserDto.Email, registerUserDto.DisplayName);
    }
}
