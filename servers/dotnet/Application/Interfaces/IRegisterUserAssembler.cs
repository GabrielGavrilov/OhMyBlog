using System;
using Application.Users.DTOs;
using Domain.Users;

namespace Application.Interfaces;

public interface IRegisterUserAssembler
{
    public User Disassemble(RegisterUserDto registerUserDto);
}
