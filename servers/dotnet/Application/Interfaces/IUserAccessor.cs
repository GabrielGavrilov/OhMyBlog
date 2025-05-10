using System;
using Domain.Users.Entities;

namespace Application.Interfaces;

public interface IUserAccessor
{
    string GetUserId();
    Task<User> GetUserAsync();
}
