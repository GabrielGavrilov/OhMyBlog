using System;
using Application.Blogs.Assemblers;
using Application.Blogs.DTOs;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore.Query;
using Persistence;

namespace Application.Blogs.Commands;

public class CreateBlog
{
    public class Command : IRequest<BlogDto>
    {
        public required BlogDto BlogDto  { get; set; }
    }

    public class Handler(AppDbContext context) : IRequestHandler<Command, BlogDto>
    {
        public async Task<BlogDto> Handle(Command request, CancellationToken cancellationToken)
        {
            BlogAssembler blogAssembler = new BlogAssembler();
            Blog blog = blogAssembler.Disassemble(request.BlogDto);
            
            context.Blogs.Add(blog);

            await context.SaveChangesAsync();
            return blogAssembler.Assemble(blog);
        }
    }
}
