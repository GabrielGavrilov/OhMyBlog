using System;
using Application.Users.DTOs;
using Domain.Users;

namespace Application.Interfaces;

public interface IUserAssembler
{
    public UserDto Assemble(User entity);
}
