using System;
using Domain;

namespace Application.Interfaces;

public interface IUserAccessor
{
    string GetUserId();
    Task<Domain.User> GetUserAsync();
}
