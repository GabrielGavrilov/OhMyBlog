using System;
using Application.Blogs.Assemblers;
using Application.Blogs.DTOs;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Blogs.Queries;

public class GetBlogList
{
    public class Query : IRequest<Result<List<BlogDto>>> {}

    public class Handler(AppDbContext context, BlogAssembler blogAssembler) : IRequestHandler<Query, Result<List<BlogDto>>>
    {
        public async Task<Result<List<BlogDto>>> Handle(Query request, CancellationToken cancellationToken)
        {
            return Result<List<BlogDto>>.Success(blogAssembler.Assemble(await context.Blogs.Include(blog => blog.User).ToListAsync(cancellationToken)));
        }
    }

}
