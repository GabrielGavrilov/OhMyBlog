using System;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Blogs.Queries;

public class GetBlogList
{
    public class Query : IRequest<List<Blog>> {}

    public class Handler(AppDbContext context) : IRequestHandler<Query, List<Blog>>
    {
        public async Task<List<Blog>> Handle(Query request, CancellationToken cancellationToken)
        {
            return await context.Blogs.ToListAsync(cancellationToken);
        }
    }

}
