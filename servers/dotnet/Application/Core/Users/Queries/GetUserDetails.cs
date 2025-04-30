using System;
using Application.Interfaces;
using Application.Users.Assemblers;
using Application.Users.DTOs;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Users.Queries;

public class GetUserDetails
{
    public class Query : IRequest<UserDto> {}

    public class Handler(IUserAccessor userAccessor, AppDbContext context) : IRequestHandler<Query, UserDto>
    {
        private readonly UserAssembler _userAssembler = new UserAssembler();

        public async Task<UserDto> Handle(Query request, CancellationToken cancellationToken)
        {
            return _userAssembler.Assemble(
                await context.Users
                    .Include(x => x.Blogs)
                    .FirstOrDefaultAsync(x => userAccessor.GetUserId() == x.Id, cancellationToken)
                        ?? throw new Exception("No user found.")
            );
        }
    }
}

