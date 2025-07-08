using System.Net;
using Application.Common;
using Application.Interfaces;
using Application.Users.DTOs;
using Domain.Users;
using MediatR;

namespace Application.Users.Queries;

public class GetCurrentUser
{
    public class Query : IRequest<Result<UserDto>> {}

    public class Handler(IUserAccessor userAccessor, IUserRepository repository, IUserAssembler userAssembler) : IRequestHandler<Query, Result<UserDto>>
    {
        public async Task<Result<UserDto>> Handle(Query request, CancellationToken cancellationToken)
        {
            var user = await repository.GetByIdAsync(userAccessor.GetUserId());
            return user == null ? Result<UserDto>.Failure((int)HttpStatusCode.NotFound) : Result<UserDto>.Success(userAssembler.Assemble(user)); 
        }
    }
}

