using System.Net;
using Application.Common;
using Application.Interfaces;
using Application.Users.Assemblers;
using Application.Users.DTOs;
using Domain.Users;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Core.Users.Queries;

public class GetUserById
{
    public class Query : IRequest<Result<UserDto>>
    {
        public required string Id { get; set; }
    }

    public class Handler(IUserRepository repository, IUserAssembler userAssembler) : IRequestHandler<Query, Result<UserDto>>
    {
        public async Task<Result<UserDto>> Handle(Query request, CancellationToken cancellationToken)
        {
            var user = await repository.GetByIdAsync(request.Id);
            return user == null ? Result<UserDto>.Failure((int)HttpStatusCode.NotFound) : Result<UserDto>.Success(userAssembler.Assemble(user)); 
        }
    }
}
