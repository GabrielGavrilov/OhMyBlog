using Domain.Users;

namespace Application.Interfaces;

public interface IUserAccessor
{
    string GetUserId();
    Task<User> GetUserAsync();
}
