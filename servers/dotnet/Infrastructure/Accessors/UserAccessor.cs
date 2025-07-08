using System.Security.Claims;
using Application.Interfaces;
using Domain.Users;
using Microsoft.AspNetCore.Http;
using Persistence;

namespace Infrastructure.Accessor;

public class UserAccessor(IHttpContextAccessor httpContextAccessor, AppDbContext dbContext) : IUserAccessor
{
    public async Task<User> GetUserAsync()
    {
        return await dbContext.Users.FindAsync(GetUserId())
            ?? throw new UnauthorizedAccessException("No user is logged in.");
    }

    public string GetUserId()
    {
        return httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier)
            ?? throw new Exception("No user found.");
    }

    Task<User> IUserAccessor.GetUserAsync()
    {
        throw new NotImplementedException();
    }
}
