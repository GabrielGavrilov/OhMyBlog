using Application.Common;
using Application.Interfaces;
using Application.Users.Assemblers;
using Application.Users.DTOs;
using Domain.Users;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Users.Queries;

public class GetCurrentUserDetails
{
    public class Query : IRequest<Result<UserDto>> {}

    public class Handler(IUserAccessor userAccessor, AppDbContext context, UserAssembler userAssembler) : IRequestHandler<Query, Result<UserDto>>
    {
        public async Task<Result<UserDto>> Handle(Query request, CancellationToken cancellationToken)
        {
            User? user = await context.Users
                    .Include(x => x.Blogs)
                    .FirstOrDefaultAsync(x => userAccessor.GetUserId() == x.Id, cancellationToken);
            return (user != null) ? Result<UserDto>.Success(userAssembler.Assemble(user)) : Result<UserDto>.Failure(404); 
        }
    }
}

