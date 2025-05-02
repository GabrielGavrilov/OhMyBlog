using System;
using Application.Users.Assemblers;
using Application.Users.DTOs;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Core.Users.Queries;

public class GetUserDetails
{
    public class Query : IRequest<UserDto>
    {
        public required string Id { get; set; }
    }

    public class Handler(AppDbContext context, UserAssembler userAssembler) : IRequestHandler<Query, UserDto>
    {
        public async Task<UserDto> Handle(Query request, CancellationToken cancellationToken)
        {
            return userAssembler.Assemble(
                await context.Users
                    .Include(x => x.Blogs)
                    .FirstAsync(x => request.Id == x.Id, cancellationToken)
                        ?? throw new Exception("No user was found.")
            );
        }
    }
}
