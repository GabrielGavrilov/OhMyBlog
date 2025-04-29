using System;
using Application.Interfaces;
using Application.Users.Assemblers;
using Application.Users.DTOs;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Application.Users.Queries;

public class GetUserDetails
{
    public class Query : IRequest<User> {}

    public class Handler(IUserAccessor userAccessor) : IRequestHandler<Query, User>
    {
        private readonly UserAssembler _userAssembler = new UserAssembler();

        public async Task<User> Handle(Query request, CancellationToken cancellationToken)
        {
            // return _userAssembler.Assemble(await userAccessor.GetUserAsync());
            return await userAccessor.GetUserAsync();
        }
    }
}

