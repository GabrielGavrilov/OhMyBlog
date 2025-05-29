using System;
using Domain.Blogs.Entities;

namespace Domain.Blogs.Interfaces;

public interface IBlogRepository
{
    Task<Blog?> GetById(string id);
    Task<Blog> AddAsync(Blog blog);
    Task<Blog> UpdateAsync(Blog blog);
    Task DeleteAsync(Blog blog);
}
