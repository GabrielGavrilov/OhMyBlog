using System;
using Application.Blogs.DTOs;
using Domain.Blogs;

namespace Application.Interfaces;

public interface IBlogAssembler
{
    public BlogDto Assemble(Blog entity);
    public List<BlogDto> Assemble(List<Blog> entities);
    public Blog Disassemble(BlogDto blogDto, string userId);
    public Blog DisassembleInto(BlogDto blogDto, Blog entity);
}
