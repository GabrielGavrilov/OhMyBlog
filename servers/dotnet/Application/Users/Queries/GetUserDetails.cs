using Application.Common;
using Application.Users.Assemblers;
using Application.Users.DTOs;
using Domain.Users;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Core.Users.Queries;

public class GetUserDetails
{
    public class Query : IRequest<Result<UserDto>>
    {
        public required string Id { get; set; }
    }

    public class Handler(AppDbContext context, UserAssembler userAssembler) : IRequestHandler<Query, Result<UserDto>>
    {
        public async Task<Result<UserDto>> Handle(Query request, CancellationToken cancellationToken)
        {
            User? user = await context.Users
                    .Include(x => x.Blogs)
                    .FirstAsync(x => request.Id == x.Id, cancellationToken);
            return (user != null) ? Result<UserDto>.Success(userAssembler.Assemble(user)) : Result<UserDto>.Failure(404); 
        }
    }
}
