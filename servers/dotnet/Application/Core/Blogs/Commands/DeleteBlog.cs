using System;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Blogs.Commands;

public class DeleteBlog
{
    public class Command : IRequest<Unit>
    {
        public required string Id { get; set; }
    }

    public class Handler(AppDbContext context) : IRequestHandler<Command, Unit>
    {
        public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
        {
            Blog blog = await context.Blogs.FindAsync([request.Id], cancellationToken)
                ?? throw new Exception("Blog does not exist.");
            
            context.Remove(blog);
            await context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }

}
