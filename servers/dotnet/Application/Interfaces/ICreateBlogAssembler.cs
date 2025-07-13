using System;
using Application.Blogs.DTOs;
using Domain.Blogs;

namespace Application.Interfaces;

public interface ICreateBlogAssembler
{
    public BlogDto Assemble(Blog entity);
    public Blog Disassemble(CreateBlogDto blogDto, string userId);
    public Blog DisassembleInto(CreateBlogDto blogDto, Blog entity);
}
