using System;
using Application.Blogs.Assemblers;
using Application.Blogs.DTOs;
using Domain;
using MediatR;
using Persistence;

namespace Application.Blogs.Queries;

public class GetBlogDetails
{
    public class Query : IRequest<BlogDto> 
    {
        public required string Id { get; set; }
    }

    public class Handler(AppDbContext context) : IRequestHandler<Query, BlogDto>
    {
        private BlogAssembler blogAssembler = new BlogAssembler();

        public async Task<BlogDto> Handle(Query request, CancellationToken cancellationToken)
        {
            return blogAssembler.Assemble(await context.Blogs.FindAsync([request.Id], cancellationToken));
        }
    }
}
