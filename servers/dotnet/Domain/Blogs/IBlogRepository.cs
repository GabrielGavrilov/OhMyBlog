using System;
using Domain.Blogs;

namespace Domain.Blogs;

public interface IBlogRepository
{
    List<Blog> Find(BlogFilter blogFilter);
    Task<Blog?> GetById(string id);
    Task<Blog> AddAsync(Blog blog);
    Task<Blog> UpdateAsync(Blog blog);
    Task DeleteAsync(Blog blog);
    Task<int> Count(BlogFilter blogFilter);
}
