using System;
using Domain.Users;
using Microsoft.EntityFrameworkCore;

namespace Persistence.Users;

public class UserRepository(AppDbContext appDbContext) : IUserRepository
{
    public async Task<User?> GetByIdAsync(string id)
    {
        return await appDbContext.Set<User>()
            .Include(x => x.Blogs)
            .FirstOrDefaultAsync(x => id == x.Id);
    }
}
