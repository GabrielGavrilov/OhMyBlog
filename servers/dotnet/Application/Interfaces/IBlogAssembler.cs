using System;
using Application.Blogs.DTOs;
using Domain.Blogs;

namespace Application.Interfaces;

public interface IBlogAssembler 
{
    public BlogDto Assemble(Blog entity);
    public List<BlogDto> Assemble(List<Blog> entities);
}
