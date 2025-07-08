using System;
using Application.Users.DTOs;
using Domain.Users;

namespace Application.Interfaces;

public interface IBlogUserAssembler
{
    public BlogUserDto Assemble(User entity);
}
