using System;
using Domain.Users;
using Microsoft.EntityFrameworkCore;

namespace Persistence.Users;

public class UserRepository(AppDbContext appDbContext) : IUserRepository
{
    public async Task<User?> GetByIdAsync(string id)
    {
        return await appDbContext.Set<User>()
            .FirstOrDefaultAsync(x => id == x.Id);
    }

    public async Task<User> UpdateAsync(User user)
    {
        appDbContext.Update(user);
        await appDbContext.SaveChangesAsync();
        return user;
    }
}
