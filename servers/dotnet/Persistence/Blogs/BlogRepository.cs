using System;
using Domain.Blogs.Entities;
using Domain.Blogs.Interfaces;

namespace Persistence.Blogs;

public class BlogRepository(AppDbContext appDbContext) : IBlogRepository
{
    public async Task<Blog> AddAsync(Blog blog)
    {
        await appDbContext.AddAsync(blog);
        await appDbContext.SaveChangesAsync();
        return blog;
    }

    public Task DeleteAsync(Blog blog)
    {
        throw new NotImplementedException();
    }

    public Task<Blog> Find()
    {
        throw new NotImplementedException();
    }

    public Task<Blog?> GetById(string id)
    {
        throw new NotImplementedException();
    }

    public Task<Blog> UpdateAsync(Blog blog)
    {
        throw new NotImplementedException();
    }
}
