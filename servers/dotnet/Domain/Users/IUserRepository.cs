using System;

namespace Domain.Users;

public interface IUserRepository
{
    Task<User?> GetByIdAsync(string id);
}
