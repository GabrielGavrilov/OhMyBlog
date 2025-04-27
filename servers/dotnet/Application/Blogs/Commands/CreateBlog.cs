using System;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore.Query;
using Persistence;

namespace Application.Blogs.Commands;

public class CreateBlog
{
    public class Command : IRequest<Blog>
    {
        public required Blog Blog  { get; set; }
    }

    public class Handler(AppDbContext context) : IRequestHandler<Command, Blog>
    {
        public async Task<Blog> Handle(Command request, CancellationToken cancellationToken)
        {
            context.Blogs.Add(request.Blog);
            
            await context.SaveChangesAsync();
            
            return request.Blog;
        }
    }
}
