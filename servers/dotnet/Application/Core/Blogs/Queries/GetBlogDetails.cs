using System;
using System.Reflection.Metadata.Ecma335;
using Application.Blogs.Assemblers;
using Application.Blogs.DTOs;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
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
        private readonly BlogAssembler _blogAssembler = new BlogAssembler();

        public async Task<BlogDto> Handle(Query request, CancellationToken cancellationToken)
        {
            // return _blogAssembler.Assemble(
            //     await context.Blogs.FindAsync([request.Id], cancellationToken)
            //         ?? throw new Exception("Blog does not exist.")
            // );
            return _blogAssembler.Assemble(
                await context.Blogs.Include(x => x.User).FirstOrDefaultAsync(x => request.Id == x.Id, cancellationToken)
            );
        }
    }
}
