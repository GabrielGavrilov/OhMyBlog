using System;
using System.ComponentModel;
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
    public class Command : IRequest<UserDto>
    {
        public required RegisterUserDto RegisterUserDto { get; set; }
    }

    public class Handler(UserManager<User> userManager) : IRequestHandler<Command, UserDto>
    {
        private readonly UserAssembler _userAssembler = new UserAssembler();
        private readonly RegisterUserAssembler _registerUserAssembler = new RegisterUserAssembler();

        public async Task<UserDto> Handle(Command request, CancellationToken cancellationToken)
        {
            User user = _registerUserAssembler.Disassemble(request.RegisterUserDto);
            var result = await userManager.CreateAsync(user, request.RegisterUserDto.Password);

            if (!result.Succeeded)
            {
                throw new Exception("Error creating user.");
            }

            return _userAssembler.Assemble(user);
        }
    }
}
