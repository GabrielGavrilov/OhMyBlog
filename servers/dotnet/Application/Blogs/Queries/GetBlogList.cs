using System;
using Application.Core;
using Domain;
using Domain.Blogs.Assemblers;
using Domain.Blogs.DTOs;
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
