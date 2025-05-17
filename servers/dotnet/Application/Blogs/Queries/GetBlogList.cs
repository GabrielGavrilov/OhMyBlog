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
        public Task<Result<List<BlogDto>>> Handle(Query request, CancellationToken cancellationToken)
        {
            return Task.FromResult(Result<List<BlogDto>>.Success(
                blogAssembler.Assemble(
                    context.Blogs
                        .Include(blog => blog.User)
                        .AsEnumerable()
                        .OrderByDescending(x => x.CreatedAt)
                        .ToList()
                )
            ));
        }
    }

}
