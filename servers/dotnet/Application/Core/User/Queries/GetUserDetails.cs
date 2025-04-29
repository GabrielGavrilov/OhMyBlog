using System;
using Application.Interfaces;
using Application.User.Assemblers;
using Application.User.DTOs;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Application.User.Queries;

public class GetUserDetails
{
    public class Query : IRequest<UserDto> {}

    public class Handler(UserManager<Domain.User> userManager, IUserAccessor userAccessor) : IRequestHandler<Query, UserDto>
    {
        private readonly UserAssembler _userAssembler = new UserAssembler();

        public async Task<UserDto> Handle(Query request, CancellationToken cancellationToken)
        {
            return _userAssembler.Assemble(await userAccessor.GetUserAsync());
        }
    }
}

