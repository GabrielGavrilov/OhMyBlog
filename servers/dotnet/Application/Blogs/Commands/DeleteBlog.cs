using System;
using Application.Core;
using Domain;
using Domain.Blogs.Entities;
using Domain.Blogs.Interfaces;
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

    public class Handler(IBlogRepository blogRepository) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            Blog? blog = await blogRepository.GetById(request.Id, cancellationToken);
            
            if (blog != null)
            {
                await blogRepository.DeleteAsync(blog);
            }

            return Result<Unit>.Success(Unit.Value);
        }
    }
}
