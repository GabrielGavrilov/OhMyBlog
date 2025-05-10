using System;
using Application.Blogs.DTOs;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Blogs.Commands;

public class DeleteBlog
{
    public class Command : IRequest<Result<Unit>>
    {
        public required string Id { get; set; }
    }

    public class Handler(AppDbContext context) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            Blog? blog = await context.Blogs.FindAsync([request.Id], cancellationToken);
            
            if (blog != null)
            {
                context.Remove(blog);
                await context.SaveChangesAsync(cancellationToken);
            }

            return Result<Unit>.Success(Unit.Value);
        }
    }
}
