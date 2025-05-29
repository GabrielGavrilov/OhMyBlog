using System;
using AutoFilterer.Extensions;
using Domain.Blogs.Entities;
using Domain.Blogs.Interfaces;
using Domain.Blogs.Repository;
using Microsoft.EntityFrameworkCore;

namespace Persistence.Blogs;

public class BlogRepository(AppDbContext appDbContext) : IBlogRepository
{
    public List<Blog> Find(BlogFilter blogFilter)
    {
        return [.. appDbContext.Blogs.Include(x => x.User).ApplyFilter(blogFilter)];
    }

    public async Task<Blog?> GetById(string id, CancellationToken cancellationToken)
    {
        return await appDbContext.Blogs
            .Include(x => x.User)
            .FirstOrDefaultAsync(x => id == x.Id, cancellationToken);
    }

    public async Task<Blog> AddAsync(Blog blog)
    {
        await appDbContext.AddAsync(blog);
        await appDbContext.SaveChangesAsync();
        return blog;
    }

    public async Task<Blog> UpdateAsync(Blog blog)
    {
        appDbContext.Update(blog);
        await appDbContext.SaveChangesAsync();
        return blog;
    }

    public async Task DeleteAsync(Blog blog)
    {
        appDbContext.Blogs.Remove(blog);
        await appDbContext.SaveChangesAsync();
    }

    public async Task<int> Count()
    {
        return await appDbContext.Blogs.CountAsync();
    }
}
