using System;
using System.ComponentModel;
using Application.Core;
using Application.Core.Users.Assemblers;
using Application.Users.Assemblers;
using Application.Users.DTOs;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Persistence;

namespace Application.Users.Commands;

public class CreateUser
{
    public class Command : IRequest<Result<UserDto>>
    {
        public required RegisterUserDto RegisterUserDto { get; set; }
    }

    public class Handler(
        UserManager<User> userManager,
        UserAssembler userAssembler,
        RegisterUserAssembler registerUserAssembler
    ) : IRequestHandler<Command, Result<UserDto>>
    {
        public async Task<Result<UserDto>> Handle(Command request, CancellationToken cancellationToken)
        {
            User user = registerUserAssembler.Disassemble(request.RegisterUserDto);
            var result = await userManager.CreateAsync(user, request.RegisterUserDto.Password);

            if (!result.Succeeded)
            {
                throw new Exception("Error creating user.");
            }

            return Result<UserDto>.Success(userAssembler.Assemble(user));
        }
    }
}
