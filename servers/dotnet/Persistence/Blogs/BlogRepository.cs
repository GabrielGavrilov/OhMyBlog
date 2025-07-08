using System;
using AutoFilterer.Extensions;
using Domain.Blogs;
using Microsoft.EntityFrameworkCore;

namespace Persistence.Blogs;

public class BlogRepository(AppDbContext appDbContext) : IBlogRepository
{
    public List<Blog> Find(BlogFilter blogFilter)
    {
        return [.. appDbContext.Blogs.Include(x => x.User).ApplyFilter(blogFilter)];
    }

    public async Task<Blog?> GetById(string id)
    {
        return await appDbContext.Set<Blog>()
            .Include(b => b.User)
            .FirstOrDefaultAsync(b => id == b.Id);
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

    public async Task<int> Count(BlogFilter blogFiler)
    {
        return await appDbContext.Set<Blog>().ApplyFilterWithoutPagination(blogFiler).CountAsync();
    }
}
