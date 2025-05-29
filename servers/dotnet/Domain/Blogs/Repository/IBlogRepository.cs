using System;
using Domain.Blogs.Entities;
using Domain.Blogs.Repository;

namespace Domain.Blogs.Interfaces;

public interface IBlogRepository
{
    List<Blog> Find(BlogFilter blogFilter);
    Task<Blog?> GetById(string id, CancellationToken cancellationToken);
    Task<Blog> AddAsync(Blog blog);
    Task<Blog> UpdateAsync(Blog blog);
    Task DeleteAsync(Blog blog);
    Task<int> Count();
}
