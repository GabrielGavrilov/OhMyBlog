using System;
using Domain.Blogs;

namespace Domain.Blogs;

public interface IBlogRepository
{
    List<Blog> Find(BlogFilter blogFilter);
    Task<Blog?> GetByIdAsync(string id);
    Task<Blog> AddAsync(Blog blog);
    Task<Blog> UpdateAsync(Blog blog);
    Task DeleteAsync(Blog blog);
    Task<int> CountAsync(BlogFilter blogFilter);
}
