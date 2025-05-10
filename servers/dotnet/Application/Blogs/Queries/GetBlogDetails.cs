using System;
using System.Reflection.Metadata.Ecma335;
using Application.Blogs.Assemblers;
using Application.Blogs.DTOs;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Blogs.Queries;

public class GetBlogDetails
{
    public class Query : IRequest<Result<BlogDto>> 
    {
        public required string Id { get; set; }
    }

    public class Handler(AppDbContext context, BlogAssembler blogAssembler) : IRequestHandler<Query, Result<BlogDto>>
    {
        public async Task<Result<BlogDto>> Handle(Query request, CancellationToken cancellationToken)
        {
            Blog? blog = await context.Blogs
                    .Include(x => x.User)
                    .FirstOrDefaultAsync(x => request.Id == x.Id, cancellationToken);
            return (blog != null) ? Result<BlogDto>.Success(blogAssembler.Assemble(blog)) : Result<BlogDto>.Failure(404); 
        }
    }
}
