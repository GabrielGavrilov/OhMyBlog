using System;
using Application.Core;
using Application.Interfaces;
using Domain;
using Domain.Users.Assemblers;
using Domain.Users.DTOs;
using Domain.Users.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;
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

