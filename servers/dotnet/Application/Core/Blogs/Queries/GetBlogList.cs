using System;
using Application.Blogs.Assemblers;
using Application.Blogs.DTOs;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Blogs.Queries;

public class GetBlogList
{
    public class Query : IRequest<List<BlogDto>> {}

    public class Handler(AppDbContext context) : IRequestHandler<Query, List<BlogDto>>
    {
        private readonly BlogAssembler _blogAssembler = new BlogAssembler();

        public async Task<List<BlogDto>> Handle(Query request, CancellationToken cancellationToken)
        {
            return _blogAssembler.Assemble(await context.Blogs.ToListAsync(cancellationToken));
        }
    }

}
